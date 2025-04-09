import React, { useState } from 'react';
import { Container, Row, Col, Card, Spinner } from 'react-bootstrap';
import SequenceInput from '../components/SequenceInput';
import ResultDisplay from '../components/ResultDisplay';
import { predictTm, predictTmWithFile } from '../services/api';

const TmPredictor: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | undefined>(undefined);

  const handleSubmit = async (sequence: string, file: File | null) => {
    setIsLoading(true);
    setError(undefined);
    setResult(null);

    try {
      let response;
      if (file) {
        // 上传文件
        response = await predictTmWithFile(file);
      } else {
        // 直接使用序列
        response = await predictTm(sequence);
      }

      if (response.success) {
        setResult(response.data);
      } else {
        setError(response.error);
      }
    } catch (err) {
      setError('预测服务发生错误，请稍后再试');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Row className="mb-4">
        <Col>
          <h2 className="text-warning">Tm预测</h2>
          <p className="text-muted">
            输入蛋白质序列，预测蛋白质的熔点(Tm)
          </p>
        </Col>
      </Row>

      <Row>
        <Col lg={6}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>输入数据</Card.Title>
              <SequenceInput 
                onSubmit={handleSubmit} 
                isLoading={isLoading} 
                includeSubstrate={false}
              />
            </Card.Body>
          </Card>
        </Col>
        <Col lg={6}>
          {isLoading ? (
            <div className="loading-spinner">
              <Spinner animation="border" role="status" variant="warning">
                <span className="visually-hidden">加载中...</span>
              </Spinner>
              <p className="mt-3">正在进行预测，请稍候...</p>
            </div>
          ) : (
            result && <ResultDisplay resultType="tm" data={result} error={error} />
          )}
        </Col>
      </Row>

      <Row className="mt-5">
        <Col>
          <h4>关于Tm预测</h4>
          <p>
            熔点Tm是蛋白质热稳定性的重要指标，定义为蛋白质折叠-解折叠过渡的中点温度。
            蛋白质的Tm值越高，其热稳定性越好。我们的预测模型基于深度学习技术，
            通过分析蛋白质序列和结构特征，预测蛋白质的Tm值。
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default TmPredictor; 