import React, { useState, ChangeEvent } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

interface SequenceInputProps {
  onSubmit: (sequence: string, file: File | null) => void;
  isLoading: boolean;
  includeSubstrate?: boolean;
}

const SequenceInput: React.FC<SequenceInputProps> = ({ 
  onSubmit, 
  isLoading,
  includeSubstrate = false 
}) => {
  const [inputMethod, setInputMethod] = useState<'text' | 'file'>('text');
  const [sequence, setSequence] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  
  // 底物相关状态（仅在需要时使用）
  const [substrateInputMethod, setSubstrateInputMethod] = useState<'text' | 'file'>('text');
  const [substrateSmiles, setSubstrateSmiles] = useState('');
  const [substrateFile, setSubstrateFile] = useState<File | null>(null);

  const handleSequenceChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setSequence(e.target.value);
    setErrorMessage('');
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setErrorMessage('');
    }
  };

  const handleSubstrateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSubstrateSmiles(e.target.value);
    setErrorMessage('');
  };

  const handleSubstrateFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSubstrateFile(e.target.files[0]);
      setErrorMessage('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 验证输入
    if (inputMethod === 'text' && sequence.trim() === '') {
      setErrorMessage('请输入蛋白质序列');
      return;
    }
    
    if (inputMethod === 'file' && !file) {
      setErrorMessage('请选择FASTA文件');
      return;
    }
    
    if (includeSubstrate) {
      if (substrateInputMethod === 'text' && substrateSmiles.trim() === '') {
        setErrorMessage('请输入底物SMILES');
        return;
      }
      
      if (substrateInputMethod === 'file' && !substrateFile) {
        setErrorMessage('请选择SMILES文件');
        return;
      }
    }
    
    // 提交数据
    onSubmit(inputMethod === 'text' ? sequence : '', file);
  };

  return (
    <Form onSubmit={handleSubmit}>
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      
      <Form.Group className="mb-4">
        <Form.Label>蛋白质序列输入方式</Form.Label>
        <div className="d-flex gap-3 mb-3">
          <Form.Check
            type="radio"
            id="sequence-text"
            label="直接输入序列"
            checked={inputMethod === 'text'}
            onChange={() => setInputMethod('text')}
          />
          <Form.Check
            type="radio"
            id="sequence-file"
            label="上传FASTA文件"
            checked={inputMethod === 'file'}
            onChange={() => setInputMethod('file')}
          />
        </div>
        
        {inputMethod === 'text' ? (
          <Form.Control
            as="textarea"
            rows={5}
            placeholder="输入蛋白质氨基酸序列 (FASTA格式或纯序列)"
            value={sequence}
            onChange={handleSequenceChange}
            className="sequence-input"
          />
        ) : (
          <Form.Control
            type="file"
            accept=".fasta,.fa,.txt"
            onChange={handleFileChange}
          />
        )}
        <Form.Text className="text-muted">
          支持FASTA格式或纯氨基酸序列文本
        </Form.Text>
      </Form.Group>
      
      {includeSubstrate && (
        <Form.Group className="mb-4">
          <Form.Label>底物输入方式</Form.Label>
          <div className="d-flex gap-3 mb-3">
            <Form.Check
              type="radio"
              id="substrate-text"
              label="直接输入SMILES"
              checked={substrateInputMethod === 'text'}
              onChange={() => setSubstrateInputMethod('text')}
            />
            <Form.Check
              type="radio"
              id="substrate-file"
              label="上传SMILES文件"
              checked={substrateInputMethod === 'file'}
              onChange={() => setSubstrateInputMethod('file')}
            />
          </div>
          
          {substrateInputMethod === 'text' ? (
            <Form.Control
              type="text"
              placeholder="输入底物的SMILES表示"
              value={substrateSmiles}
              onChange={handleSubstrateChange}
            />
          ) : (
            <Form.Control
              type="file"
              accept=".smi,.txt"
              onChange={handleSubstrateFileChange}
            />
          )}
          <Form.Text className="text-muted">
            支持SMILES格式描述底物结构
          </Form.Text>
        </Form.Group>
      )}
      
      <div className="d-grid">
        <Button 
          variant="primary" 
          type="submit" 
          size="lg" 
          disabled={isLoading}
        >
          {isLoading ? '预测中...' : '开始预测'}
        </Button>
      </div>
    </Form>
  );
};

export default SequenceInput; 