import React from 'react';
import { Card, Table, Alert } from 'react-bootstrap';

interface ResultDisplayProps {
  resultType: 'kcat' | 'km' | 'tm' | 'solubility';
  data: any;
  error?: string;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ resultType, data, error }) => {
  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  if (!data) {
    return null;
  }

  const renderKcatResult = () => (
    <Card>
      <Card.Header as="h5" className="bg-primary text-white">Kcat预测结果</Card.Header>
      <Card.Body>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>预测值 (s<sup>-1</sup>)</th>
              <th>置信区间</th>
              <th>可靠性评分</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{data.predicted_kcat}</td>
              <td>{data.confidence_interval}</td>
              <td>{data.reliability_score}</td>
            </tr>
          </tbody>
        </Table>
        {data.similar_enzymes && (
          <div className="mt-4">
            <h6>相似酶的实验数据</h6>
            <Table size="sm">
              <thead>
                <tr>
                  <th>酶名称</th>
                  <th>序列相似度</th>
                  <th>实验Kcat (s<sup>-1</sup>)</th>
                </tr>
              </thead>
              <tbody>
                {data.similar_enzymes.map((enzyme: any, idx: number) => (
                  <tr key={idx}>
                    <td>{enzyme.name}</td>
                    <td>{enzyme.similarity}%</td>
                    <td>{enzyme.kcat}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
      </Card.Body>
    </Card>
  );

  const renderKmResult = () => (
    <Card>
      <Card.Header as="h5" className="bg-danger text-white">Km预测结果</Card.Header>
      <Card.Body>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>预测值 (mM)</th>
              <th>置信区间</th>
              <th>可靠性评分</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{data.predicted_km}</td>
              <td>{data.confidence_interval}</td>
              <td>{data.reliability_score}</td>
            </tr>
          </tbody>
        </Table>
        {data.similar_enzymes && (
          <div className="mt-4">
            <h6>相似酶的实验数据</h6>
            <Table size="sm">
              <thead>
                <tr>
                  <th>酶名称</th>
                  <th>序列相似度</th>
                  <th>实验Km (mM)</th>
                </tr>
              </thead>
              <tbody>
                {data.similar_enzymes.map((enzyme: any, idx: number) => (
                  <tr key={idx}>
                    <td>{enzyme.name}</td>
                    <td>{enzyme.similarity}%</td>
                    <td>{enzyme.km}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
      </Card.Body>
    </Card>
  );

  const renderTmResult = () => (
    <Card>
      <Card.Header as="h5" className="bg-warning text-dark">Tm预测结果</Card.Header>
      <Card.Body>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>预测值 (°C)</th>
              <th>置信区间</th>
              <th>可靠性评分</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{data.predicted_tm}</td>
              <td>{data.confidence_interval}</td>
              <td>{data.reliability_score}</td>
            </tr>
          </tbody>
        </Table>
        {data.protein_features && (
          <div className="mt-4">
            <h6>蛋白质特征分析</h6>
            <Table size="sm">
              <tbody>
                <tr>
                  <td>氨基酸组成</td>
                  <td>{data.protein_features.amino_acid_composition}</td>
                </tr>
                <tr>
                  <td>二级结构预测</td>
                  <td>{data.protein_features.secondary_structure}</td>
                </tr>
                <tr>
                  <td>等电点</td>
                  <td>{data.protein_features.isoelectric_point}</td>
                </tr>
              </tbody>
            </Table>
          </div>
        )}
      </Card.Body>
    </Card>
  );

  const renderSolubilityResult = () => (
    <Card>
      <Card.Header as="h5" className="bg-success text-white">溶解度预测结果</Card.Header>
      <Card.Body>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>预测溶解度</th>
              <th>可溶性评分</th>
              <th>可靠性评分</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{data.predicted_solubility}</td>
              <td>{data.solubility_score}</td>
              <td>{data.reliability_score}</td>
            </tr>
          </tbody>
        </Table>
        {data.solubility_factors && (
          <div className="mt-4">
            <h6>影响溶解度的关键因素</h6>
            <Table size="sm">
              <thead>
                <tr>
                  <th>因素</th>
                  <th>评分</th>
                  <th>影响程度</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(data.solubility_factors).map(([key, value]: [string, any]) => (
                  <tr key={key}>
                    <td>{key}</td>
                    <td>{value.score}</td>
                    <td>{value.impact}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
      </Card.Body>
    </Card>
  );

  const renderResult = () => {
    switch (resultType) {
      case 'kcat':
        return renderKcatResult();
      case 'km':
        return renderKmResult();
      case 'tm':
        return renderTmResult();
      case 'solubility':
        return renderSolubilityResult();
      default:
        return <Alert variant="warning">未知的结果类型</Alert>;
    }
  };

  return (
    <div className="result-container">
      <h4 className="mb-4">预测结果</h4>
      {renderResult()}
    </div>
  );
};

export default ResultDisplay; 