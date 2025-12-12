import React, { useState } from 'react';
import { ArrowRight, RotateCcw } from 'lucide-react';
import { Dosha, QuizResult } from '../types';
import { getRecommendedProducts } from '../services/api';
import ProductCard from '../components/ProductCard';

const questions = [
  {
    id: 1,
    text: "How would you describe your body frame?",
    options: [
      { text: "Thin, lanky, prominent joints", type: "Vata" },
      { text: "Medium, athletic, well-proportioned", type: "Pitta" },
      { text: "Large, sturdy, heavy bone structure", type: "Kapha" }
    ]
  },
  {
    id: 2,
    text: "How is your sleep pattern?",
    options: [
      { text: "Light, interrupted, often have insomnia", type: "Vata" },
      { text: "Sound, short duration, wake up alert", type: "Pitta" },
      { text: "Deep, long, heavy, hard to wake up", type: "Kapha" }
    ]
  },
  {
    id: 3,
    text: "How does your skin typically feel?",
    options: [
      { text: "Dry, rough, cold to touch", type: "Vata" },
      { text: "Warm, oily, sensitive, prone to redness", type: "Pitta" },
      { text: "Cool, moist, thick, smooth", type: "Kapha" }
    ]
  },
  {
    id: 4,
    text: "How do you react to stress?",
    options: [
      { text: "Anxious, fearful, worry easily", type: "Vata" },
      { text: "Irritable, angry, impatient", type: "Pitta" },
      { text: "Calm, withdrawn, sometimes stubborn", type: "Kapha" }
    ]
  }
];

const DoshaQuiz: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [scores, setScores] = useState({ Vata: 0, Pitta: 0, Kapha: 0 });
  const [result, setResult] = useState<QuizResult | null>(null);
  const [recommendations, setRecommendations] = useState<any[]>([]);

  const handleAnswer = (type: string) => {
    const newScores = { ...scores, [type]: scores[type as keyof typeof scores] + 1 };
    setScores(newScores);

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      calculateResult(newScores);
    }
  };

  const calculateResult = async (finalScores: any) => {
    const sorted = Object.entries(finalScores).sort(([,a], [,b]) => (b as number) - (a as number));
    const dominant = sorted[0][0] as Dosha;
    
    setResult({
      vata: finalScores.Vata,
      pitta: finalScores.Pitta,
      kapha: finalScores.Kapha,
      dominant: dominant
    });

    const recs = await getRecommendedProducts(dominant);
    setRecommendations(recs);
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setScores({ Vata: 0, Pitta: 0, Kapha: 0 });
    setResult(null);
  };

  if (result) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-serif font-bold text-veda-900 mb-2">Your Dominant Dosha is</h2>
        <h1 className="text-6xl font-serif font-bold text-nature mb-6">{result.dominant}</h1>
        
        <div className="bg-veda-50 p-8 rounded-2xl mb-12 border border-veda-200">
            <p className="text-lg text-gray-700 mb-4 max-w-2xl mx-auto">
                {result.dominant === 'Vata' && "You embody the energy of movement. You are creative and energetic but need grounding to avoid anxiety and dryness."}
                {result.dominant === 'Pitta' && "You embody the energy of transformation. You are ambitious and sharp but need cooling to avoid inflammation and burnout."}
                {result.dominant === 'Kapha' && "You embody the energy of structure. You are calm and loving but need stimulation to avoid stagnation and lethargy."}
            </p>
            <div className="flex justify-center gap-8 mt-6">
                <div className="text-sm"><span className="font-bold block text-xl">{Math.round((result.vata / questions.length) * 100)}%</span> Vata</div>
                <div className="text-sm"><span className="font-bold block text-xl">{Math.round((result.pitta / questions.length) * 100)}%</span> Pitta</div>
                <div className="text-sm"><span className="font-bold block text-xl">{Math.round((result.kapha / questions.length) * 100)}%</span> Kapha</div>
            </div>
            <button onClick={resetQuiz} className="mt-8 flex items-center justify-center gap-2 mx-auto text-veda-600 hover:text-nature">
                <RotateCcw className="w-4 h-4" /> Retake Quiz
            </button>
        </div>

        <h3 className="text-2xl font-serif font-bold text-veda-900 mb-8">Recommended For You</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {recommendations.map(product => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-veda-50 px-4">
      <div className="w-full max-w-xl bg-white p-8 rounded-2xl shadow-xl border border-veda-100">
        <div className="mb-8">
            <div className="h-2 w-full bg-veda-100 rounded-full overflow-hidden">
                <div 
                    className="h-full bg-nature transition-all duration-500 ease-out"
                    style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
                ></div>
            </div>
            <p className="text-right text-xs text-veda-500 mt-2">Question {currentStep + 1} of {questions.length}</p>
        </div>

        <h2 className="text-2xl font-serif font-bold text-veda-900 mb-8 text-center">
            {questions[currentStep].text}
        </h2>

        <div className="space-y-4">
            {questions[currentStep].options.map((option, idx) => (
                <button
                    key={idx}
                    onClick={() => handleAnswer(option.type)}
                    className="w-full p-4 text-left border border-veda-200 rounded-xl hover:bg-veda-50 hover:border-nature hover:shadow-md transition-all flex items-center justify-between group"
                >
                    <span className="text-veda-800 font-medium">{option.text}</span>
                    <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-nature opacity-0 group-hover:opacity-100 transition-all" />
                </button>
            ))}
        </div>
      </div>
    </div>
  );
};

export default DoshaQuiz;
