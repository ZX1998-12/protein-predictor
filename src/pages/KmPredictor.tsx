import React, { useState } from 'react';
import { Container, Row, Col, Card, Spinner } from 'react-bootstrap';
import SequenceInput from '../components/SequenceInput';
import ResultDisplay from '../components/ResultDisplay';
import { predictKm, predictKmWithFile } from '../services/api';

const KmPredictor: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | undefined>(undefined);

  const handleSubmit = async (sequence: string, file: File | null) => {
    setIsLoading(true);
    setError(undefined);
    setResult(null);

    try {
      // 这里应该还需要底物信息，但在这个预览版中，我们假设已经有了
      // 实际实现时需要从界面获取底物数据
      const substrate = "CC(=O)Nc1ccc(O)cc1"; // 示例底物SMILES
      
      let response;
      if (file) {
        // 上传文件
        response = await predictKmWithFile(file, null);
      } else {
        // 直接使用序列
        response = await predictKm(sequence, substrate);
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
          <h2 className="text-danger">Km预测</h2>
          <p className="text-muted">
            输入蛋白质序列和底物信息，预测米氏常数(Km)
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
                includeSubstrate={true}
              />
            </Card.Body>
          </Card>
        </Col>
        <Col lg={6}>
          {isLoading ? (
            <div className="loading-spinner">
              <Spinner animation="border" role="status" variant="danger">
                <span className="visually-hidden">加载中...</span>
              </Spinner>
              <p className="mt-3">正在进行预测，请稍候...</p>
            </div>
          ) : (
            result && <ResultDisplay resultType="km" data={result} error={error} />
          )}
        </Col>
      </Row>

      <Row className="mt-5">
        <Col>
          <h4>关于Km预测</h4>
          <p>
            米氏常数Km是酶动力学中的重要参数，表示酶反应速率达到最大值一半时的底物浓度。
            Km值反映了酶与底物之间的亲和力，Km值越小表示亲和力越强。我们的预测模型基于深度学习技术，
            通过分析蛋白质序列和底物结构，预测特定酶-底物组合的Km值。
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default KmPredictor; 