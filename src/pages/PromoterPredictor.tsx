import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import SequenceInput from '../components/SequenceInput';
import ResultDisplay from '../components/ResultDisplay';
import { predictPromoter, predictPromoterWithFile, PredictionResponse } from '../services/api';

const PromoterPredictor: React.FC = () => {
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
        const result = await predictPromoter(sequence);
        setResult(result);
      } else if (file) {
        // 使用文件预测
        const result = await predictPromoterWithFile(file);
        setResult(result);
      } else {
        setError('请输入DNA序列或上传序列文件');
      }
    } catch (err: any) {
      setError('预测请求失败: ' + (err.message || '未知错误'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <h1 className="mb-4">启动子强度预测</h1>
      <p className="lead mb-4">
        通过深度学习模型预测启动子的表达强度，帮助基因工程设计和优化。
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
                  placeholder="请输入启动子DNA序列 (ATCG)"
                  sequenceType="DNA"
                />

                <div className="d-grid gap-2 mt-4">
                  <Button 
                    variant="primary" 
                    type="submit" 
                    size="lg" 
                    disabled={loading || (!sequence && !file)}
                  >
                    {loading ? '预测中...' : '预测启动子强度'}
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
                  resultTitle="启动子强度预测结果"
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
                启动子强度预测工具可以预测给定DNA序列作为启动子的相对表达强度。
              </p>
              <hr />
              <h6>适用序列</h6>
              <ul>
                <li>大肠杆菌启动子序列</li>
                <li>长度应在50-200bp之间</li>
                <li>应仅包含ATCG碱基</li>
              </ul>
              <hr />
              <h6>结果解读</h6>
              <p>
                预测结果为相对表达强度值，范围通常在0-1之间，值越大表示启动子强度越高。
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PromoterPredictor; 