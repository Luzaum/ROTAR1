import React, { useState } from 'react';
import { SimpleQuestion } from '../../types';
import { ActionIconButton } from '../ui/ActionIconButton';
import { useQuestionDispatch } from '../../context/QuestionContext';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface ExpandableQuestionProps {
  question: SimpleQuestion;
  onDrLuzaumClick?: () => void;
}

export function ExpandableQuestion({ question, onDrLuzaumClick }: ExpandableQuestionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const dispatch = useQuestionDispatch();

  const handleToggleFavorite = () => {
    dispatch({ type: 'TOGGLE_FAVORITE', payload: { questionId: question.id } });
  };

  const handleToggleSave = () => {
    dispatch({ type: 'TOGGLE_SAVE', payload: { questionId: question.id } });
  };

  // Criar título da questão
  const questionTitle = question.faculty && question.year && question.area && question.theme
    ? `(${question.faculty}-${question.year}) ${question.area} - ${question.theme}`
    : question.title || '';

  return (
    <div className="border border-slate-700 rounded-lg mb-4 transition-all duration-300 bg-card">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full text-left p-4 hover:bg-slate-800/50 transition-colors"
      >
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h3 className="font-medium text-primary mb-1">{questionTitle}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2">{question.question}</p>
          </div>
          <div className="flex items-center gap-2 ml-4">
            {isExpanded ? (
              <ChevronUp size={20} className="text-muted-foreground" />
            ) : (
              <ChevronDown size={20} className="text-muted-foreground" />
            )}
          </div>
        </div>
        <span className="text-xs text-emerald-400 mt-2 block">
          {isExpanded ? 'Clique para fechar' : 'Clique para expandir'}
        </span>
      </button>

      {isExpanded && (
        <div className="p-4 border-t border-slate-700">
          {/* Alternativas com feedback */}
          <div className="space-y-3 mb-6">
            <h4 className="font-semibold text-lg mb-3">Alternativas</h4>
            {question.alternatives.map(alt => {
              const isCorrect = alt.isCorrect;
              const style = isCorrect 
                ? 'border-green-500 bg-green-900/20 text-green-200' 
                : 'border-red-500 bg-red-900/20 text-red-200';
              return (
                <div key={alt.id} className={`p-3 border rounded-md ${style}`}>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-accent/50 flex items-center justify-center shrink-0 mt-0.5">
                      {alt.id.toUpperCase()}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{alt.text}</p>
                      <p className="text-xs mt-2 opacity-80">{alt.explanation}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Explicação geral */}
          {question.explanation && (
            <div className="p-3 bg-slate-800 rounded-md mb-4">
              <h4 className="font-semibold mb-2">Explicação</h4>
              <p className="text-sm text-slate-300">{question.explanation}</p>
            </div>
          )}
          
          {/* Anotações do Usuário */}
          {question.note && (
             <div className="p-3 bg-amber-900/20 border border-amber-700 rounded-md mb-4">
                <h4 className="font-semibold mb-2 text-amber-200">📝 Minhas Anotações</h4>
                <p className="text-sm text-amber-100 whitespace-pre-wrap">{question.note}</p>
             </div>
          )}

          {/* Ações */}
          <div className="flex items-center gap-4 pt-4 border-t border-slate-700">
            <ActionIconButton
              type="favorite"
              isToggled={question.isFavorited || false}
              onClick={handleToggleFavorite}
            />
            <ActionIconButton
              type="save"
              isToggled={question.isSaved || false}
              onClick={handleToggleSave}
            />
            <button 
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 rounded-md text-sm font-medium transition-colors"
              onClick={onDrLuzaumClick}
            >
              Revisão com Dr. Luzaum
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
