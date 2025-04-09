import React, { useState } from 'react';
import { Container, Row, Col, Card, Spinner } from 'react-bootstrap';
import SequenceInput from '../components/SequenceInput';
import ResultDisplay from '../components/ResultDisplay';
import { predictSolubility, predictSolubilityWithFile } from '../services/api';

const SolubilityPredictor: React.FC = () => {
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
        response = await predictSolubilityWithFile(file);
      } else {
        // 直接使用序列
        response = await predictSolubility(sequence);
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
          <h2 className="text-success">溶解度预测</h2>
          <p className="text-muted">
            输入蛋白质序列，预测蛋白质的溶解度
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
              <Spinner animation="border" role="status" variant="success">
                <span className="visually-hidden">加载中...</span>
              </Spinner>
              <p className="mt-3">正在进行预测，请稍候...</p>
            </div>
          ) : (
            result && <ResultDisplay resultType="solubility" data={result} error={error} />
          )}
        </Col>
      </Row>

      <Row className="mt-5">
        <Col>
          <h4>关于溶解度预测</h4>
          <p>
            蛋白质溶解度是蛋白质表达和纯化中的关键参数，直接影响蛋白质的产量和功能研究。
            我们的预测模型基于深度学习技术，通过分析蛋白质序列中的理化特性和结构信息，
            预测蛋白质在大肠杆菌表达系统中的可溶性水平，为蛋白质工程和表达优化提供参考。
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default SolubilityPredictor; 