import React, { useState, useEffect } from 'react';
import { Play, AlertCircle, CheckCircle } from 'lucide-react';

interface CodeEditorProps {
  initialCode: string;
  expectedOutput?: string;
  onCodeCompile: (code: string, isCorrect: boolean) => void;
  validationFn?: (code: string) => boolean;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  initialCode,
  expectedOutput,
  onCodeCompile,
  validationFn,
}) => {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setCode(initialCode);
    setOutput(null);
    setIsCorrect(null);
    setError(null);
  }, [initialCode]);

  const runCode = () => {
    setError(null);
    setOutput(null);
    
    try {
      // Simulate code execution by evaluating Solidity code
      // In a real app, this would be a proper Solidity compiler or sandbox
      let isValid = true;
      if (validationFn) {
        isValid = validationFn(code);
      }
      
      if (!isValid) {
        setError("Your code doesn't match the expected solution.");
        setIsCorrect(false);
        onCodeCompile(code, false);
        return;
      }
      
      // For simplicity, we'll just mimic a successful execution
      // In a real app, this would be the actual output of execution
      const simulatedOutput = expectedOutput || "Successfully compiled! Your zombie is being created...";
      setOutput(simulatedOutput);
      setIsCorrect(true);
      onCodeCompile(code, true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred while running your code.");
      setIsCorrect(false);
      onCodeCompile(code, false);
    }
  };

  return (
    <div className="bg-gray-950 rounded-lg overflow-hidden shadow-lg border border-gray-800">
      <div className="flex justify-between items-center px-4 py-2 bg-gray-900 border-b border-gray-800">
        <h3 className="text-sm font-medium text-white">Code Editor</h3>
        <button
          onClick={runCode}
          className="flex items-center px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white text-sm rounded transition-colors"
        >
          <Play size={14} className="mr-1" />
          Run Code
        </button>
      </div>
      
      <div className="p-0">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full bg-gray-950 text-gray-300 font-mono text-sm p-4 border-none outline-none resize-none h-96"
          spellCheck="false"
        />
      </div>
      
      {(output || error) && (
        <div className="border-t border-gray-800 p-4">
          <div className="flex items-start space-x-2">
            {isCorrect ? (
              <CheckCircle size={20} className="text-green-500 mt-0.5" />
            ) : (
              <AlertCircle size={20} className="text-red-500 mt-0.5" />
            )}
            <div>
              <h4 className={`text-sm font-medium ${isCorrect ? 'text-green-500' : 'text-red-500'}`}>
                {isCorrect ? 'Success!' : 'Error'}
              </h4>
              <pre className="mt-2 text-sm whitespace-pre-wrap text-gray-300 bg-gray-900 p-3 rounded">
                {output || error}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CodeEditor;