import React, { useState, useRef, useCallback } from 'react';
import { analyzeSkinImage } from '../services/geminiService';
import CameraView from './CameraView';
import Spinner from './Spinner';
import { CameraIcon, UploadIcon, XIcon, SparklesIcon, MedicalIcon } from './Icons';
import DermatologistList from './DermatologistList';


const SkinDetector: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [imageMimeType, setImageMimeType] = useState<string>('');
  const [analysis, setAnalysis] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [showCamera, setShowCamera] = useState<boolean>(false);
  const [showDoctors, setShowDoctors] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Please upload a valid image file.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setImageMimeType(file.type);
        resetState();
      };
      reader.readAsDataURL(file);
    }
  };
  
  const resetState = () => {
      setAnalysis('');
      setError('');
      setShowDoctors(false);
  };

  const handleAnalyze = async () => {
    if (!image) {
      setError('Please upload or capture an image first.');
      return;
    }
    setIsLoading(true);
    setError('');
    setAnalysis('');
    setShowDoctors(false);

    try {
      const base64Data = image.split(',')[1];
      const result = await analyzeSkinImage(base64Data, imageMimeType);
      setAnalysis(result);
    } catch (err) {
      setError('An unexpected error occurred during analysis.');
    } finally {
      setIsLoading(false);
    }
  };

  const clearImage = () => {
    setImage(null);
    setImageMimeType('');
    setAnalysis('');
    setError('');
    setShowDoctors(false);
    if(fileInputRef.current) {
        fileInputRef.current.value = "";
    }
  };
  
  const handleCapture = (imageDataUrl: string) => {
    setImage(imageDataUrl);
    setImageMimeType('image/jpeg');
    setShowCamera(false);
    resetState();
  };

  return (
    <div className="container mx-auto max-w-4xl">
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white mb-4">Get Your Skin Analysis</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6">Upload a photo or use your camera to get an AI-powered analysis and home remedy suggestions.</p>

            {!image && !showCamera && (
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button onClick={() => fileInputRef.current?.click()} className="flex flex-col items-center justify-center p-8 bg-slate-100 dark:bg-slate-700 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors duration-200">
                        <UploadIcon />
                        <span className="mt-2 font-semibold">Upload Image</span>
                    </button>
                    <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageUpload} className="hidden" />
                    
                    <button onClick={() => setShowCamera(true)} className="flex flex-col items-center justify-center p-8 bg-slate-100 dark:bg-slate-700 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors duration-200">
                        <CameraIcon />
                        <span className="mt-2 font-semibold">Use Camera</span>
                    </button>
                 </div>
            )}

            {showCamera && <CameraView onCapture={handleCapture} onCancel={() => setShowCamera(false)} />}
            
            {image && !showCamera && (
                <div className="space-y-6">
                    <div className="relative group w-full max-w-md mx-auto">
                        <img src={image} alt="Skin preview" className="rounded-lg shadow-md w-full h-auto object-cover"/>
                        <button onClick={clearImage} className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full p-1.5 hover:bg-opacity-75 transition-opacity opacity-0 group-hover:opacity-100">
                           <XIcon />
                        </button>
                    </div>
                    <div className="text-center">
                        <button onClick={handleAnalyze} disabled={isLoading} className="inline-flex items-center justify-center px-8 py-3 font-semibold text-white bg-gradient-to-r from-teal-500 to-blue-600 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transform transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
                            {isLoading ? <Spinner /> : <><SparklesIcon /> <span className="ml-2">Analyze Skin</span></>}
                        </button>
                    </div>
                </div>
            )}
        </div>

        {(isLoading || analysis || error) && (
            <div className="p-6 md:p-8 border-t border-slate-200 dark:border-slate-700">
                 {isLoading && (
                    <div className="text-center">
                        <p className="text-slate-600 dark:text-slate-400">Analyzing your image... Please wait.</p>
                    </div>
                 )}
                 {error && <p className="text-red-500 text-center">{error}</p>}
                 {analysis && !isLoading && (
                     <>
                        <div className="prose prose-slate dark:prose-invert max-w-none">
                            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4">Analysis Results</h3>
                            <div dangerouslySetInnerHTML={{ __html: analysis.replace(/\n/g, '<br />') }} />
                            <div className="mt-6 p-4 bg-amber-100 border-l-4 border-amber-500 text-amber-800 dark:bg-amber-900 dark:text-amber-200 dark:border-amber-600 rounded-r-lg">
                                <p className="font-bold">Disclaimer:</p>
                                <p>These remedies and suggestions are generated by an AI and are not provided by a dermatologist. This analysis is for informational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.</p>
                            </div>
                        </div>

                        {!showDoctors && (
                            <div className="text-center mt-8">
                                <button
                                    onClick={() => setShowDoctors(true)}
                                    className="inline-flex items-center justify-center px-8 py-3 font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transform transition-all duration-200"
                                >
                                    <MedicalIcon />
                                    <span className="ml-2">Consult a Dermatologist</span>
                                </button>
                            </div>
                        )}
                        
                        {showDoctors && <DermatologistList />}
                     </>
                 )}
            </div>
        )}
      </div>
    </div>
  );
};


export default SkinDetector;