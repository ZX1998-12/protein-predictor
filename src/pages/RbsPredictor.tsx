import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import SequenceInput from '../components/SequenceInput';
import ResultDisplay from '../components/ResultDisplay';
import { predictRbs, predictRbsWithFile, PredictionResponse } from '../services/api';

const RbsPredictor: React.FC = () => {
  const [sequence, setSequence] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<PredictionResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSequenceChange = (value: string) => {
    setSequence(value);
    // 清除文件
    setFile(null);
  };

  const handleFileChange = (selectedFile: File | null) => {
    setFile(selectedFile);
    // 清除序列
    setSequence('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      if (sequence) {
        // 使用序列预测
        const result = await predictRbs(sequence);
        setResult(result);
      } else if (file) {
        // 使用文件预测
        const result = await predictRbsWithFile(file);
        setResult(result);
      } else {
        setError('请输入RBS序列或上传序列文件');
      }
    } catch (err: any) {
      setError('预测请求失败: ' + (err.message || '未知错误'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <h1 className="mb-4">RBS翻译起始率预测</h1>
      <p className="lead mb-4">
        预测核糖体结合位点(RBS)的翻译起始率，用于基因表达调控优化。
      </p>

      <Row>
        <Col lg={8}>
          <Card className="shadow-sm">
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <SequenceInput 
                  sequence={sequence}
                  onSequenceChange={handleSequenceChange}
                  file={file}
                  onFileChange={handleFileChange}
                  placeholder="请输入RBS序列 (ATCG)"
                  sequenceType="DNA"
                />

                <div className="d-grid gap-2 mt-4">
                  <Button 
                    variant="primary" 
                    type="submit" 
                    size="lg" 
                    disabled={loading || (!sequence && !file)}
                  >
                    {loading ? '预测中...' : '预测RBS翻译起始率'}
                  </Button>
                </div>
              </Form>

              {error && (
                <Alert variant="danger" className="mt-4">
                  {error}
                </Alert>
              )}

              {result && (
                <ResultDisplay 
                  result={result} 
                  loading={loading}
                  resultTitle="RBS翻译起始率预测结果"
                />
              )}
            </Card.Body>
          </Card>
        </Col>
        <Col lg={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <h5 className="mb-3">使用说明</h5>
              <p>
                RBS翻译起始率预测工具可以预测给定核糖体结合位点序列的翻译起始效率。
              </p>
              <hr />
              <h6>适用序列</h6>
              <ul>
                <li>细菌RBS序列</li>
                <li>长度通常在5-30bp之间</li>
                <li>应包含Shine-Dalgarno序列或其变体</li>
                <li>可以包括起始密码子(AUG)上下文</li>
              </ul>
              <hr />
              <h6>结果解读</h6>
              <p>
                预测结果为翻译效率值，表示相对于标准RBS的强度，数值越大表示翻译起始率越高。
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default RbsPredictor; 