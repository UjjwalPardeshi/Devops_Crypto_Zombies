import React from 'react';
import { Zap, Book, Code, Info } from 'lucide-react';

interface LessonContentProps {
  title: string;
  introduction: string;
  contentBlocks: {
    type: 'concept' | 'code' | 'explanation' | 'note';
    title?: string;
    content: string;
  }[];
}

const LessonContent: React.FC<LessonContentProps> = ({
  title,
  introduction,
  contentBlocks,
}) => {
  const getBlockIcon = (type: string) => {
    switch (type) {
      case 'concept':
        return <Zap size={20} className="text-yellow-500" />;
      case 'code':
        return <Code size={20} className="text-blue-500" />;
      case 'explanation':
        return <Book size={20} className="text-green-500" />;
      case 'note':
        return <Info size={20} className="text-purple-500" />;
      default:
        return null;
    }
  };

  const getBlockClass = (type: string) => {
    switch (type) {
      case 'concept':
        return 'border-yellow-800 bg-yellow-900/20';
      case 'code':
        return 'border-blue-800 bg-blue-900/20';
      case 'explanation':
        return 'border-green-800 bg-green-900/20';
      case 'note':
        return 'border-purple-800 bg-purple-900/20';
      default:
        return 'border-gray-800 bg-gray-900/20';
    }
  };

  return (
    <div className="bg-gray-900 rounded-lg shadow-lg overflow-hidden border border-gray-800">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4 text-white">{title}</h2>
        <p className="text-gray-300 mb-8 leading-relaxed">{introduction}</p>
        
        <div className="space-y-6">
          {contentBlocks.map((block, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border ${getBlockClass(block.type)}`}
            >
              <div className="flex items-center mb-2">
                {getBlockIcon(block.type)}
                {block.title && (
                  <h3 className="ml-2 text-lg font-medium text-white">
                    {block.title}
                  </h3>
                )}
              </div>
              
              {block.type === 'code' ? (
                <pre className="bg-gray-950 p-4 rounded text-gray-300 font-mono text-sm overflow-x-auto">
                  {block.content}
                </pre>
              ) : (
                <div className="text-gray-300 leading-relaxed">
                  {block.content.split('\n').map((text, i) => (
                    <p key={i} className={i > 0 ? 'mt-2' : ''}>
                      {text}
                    </p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LessonContent;