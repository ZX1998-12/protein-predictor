import React from 'react';
import { Card, Table, Alert, Spinner, Button } from 'react-bootstrap';
import { PredictionResponse } from '../services/api';

interface ResultDisplayProps {
  result?: PredictionResponse;
  resultType?: 'kcat' | 'km' | 'tm' | 'solubility' | 'promoter' | 'rbs';
  data?: any;
  error?: string;
  loading?: boolean;
  resultTitle?: string;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ 
  result, 
  resultType, 
  data: propData, 
  error: propError,
  loading = false,
  resultTitle
}) => {
  // 从result对象或独立参数中获取数据
  const data = result?.data || propData;
  const error = result?.error || propError;

  if (loading) {
    return (
      <div className="loading-spinner">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">加载中...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  if (!data) {
    return null;
  }

  // 如果有自定义标题或从result中解析的数据，显示一个通用卡片
  if (resultTitle || (!resultType && data)) {
    return (
      <Card>
        <Card.Header as="h5" className="bg-primary text-white">
          {resultTitle || "预测结果"}
        </Card.Header>
        <Card.Body>
          {typeof data === 'object' ? (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>参数</th>
                  <th>预测值</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(data).map(([key, value]) => (
                  <tr key={key}>
                    <td>{key}</td>
                    <td>{value?.toString() || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p>{data}</p>
          )}
        </Card.Body>
      </Card>
    );
  }

  const renderKcatResult = () => {
    // 检查是否有多个结果
    const hasMultipleResults = data.results && Array.isArray(data.results);
    const results = hasMultipleResults ? data.results : [data];
    const displayResults = hasMultipleResults ? results.slice(0, 10) : results; // 只显示前10条
    const hasMoreResults = hasMultipleResults && results.length > 10;

    // 导出为CSV功能
    const exportToCsv = () => {
      // 创建CSV内容
      const header = ["protein_sequence", "smiles", "predicted_kcat"];
      const rows = results.map((item: any) => [
        item.protein_sequence || "",
        item.smiles || "", 
        item.predicted_kcat || ""
      ]);
      
      const csvContent = [
        header.join(","),
        ...rows.map((row: string[]) => row.join(","))
      ].join("\n");
      
      // 创建Blob和下载链接
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', 'kcat_predictions.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

    return (
      <Card>
        <Card.Header as="h5" className="bg-primary text-white d-flex justify-content-between align-items-center">
          <span>Kcat预测结果</span>
          {results.length > 0 && (
            <Button 
              variant="light" 
              size="sm" 
              onClick={exportToCsv}
            >
              导出CSV
            </Button>
          )}
        </Card.Header>
        <Card.Body>
          {data.model_info && (
            <Alert variant="info" className="mb-3">
              <strong>预测信息：</strong> {data.model_info}
            </Alert>
          )}
          
          {hasMultipleResults && (
            <p className="mb-3">共 {results.length} 条预测结果，显示前 {Math.min(10, results.length)} 条</p>
          )}
          
          <Table striped bordered hover>
            <thead>
              <tr>
                {hasMultipleResults && <th>#</th>}
                <th>蛋白质序列</th>
                <th>底物SMILES</th>
                <th>预测Kcat值 (s<sup>-1</sup>)</th>
              </tr>
            </thead>
            <tbody>
              {displayResults.map((result: any, index: number) => (
                <tr key={index}>
                  {hasMultipleResults && <td>{index + 1}</td>}
                  <td style={{ maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {result.protein_sequence || "N/A"}
                  </td>
                  <td style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {result.smiles || "N/A"}
                  </td>
                  <td>{result.predicted_kcat || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          
          {hasMoreResults && (
            <div className="mt-2 text-muted">
              共有 {results.length} 条结果，仅显示前 10 条。点击"导出CSV"查看所有结果。
            </div>
          )}
        </Card.Body>
      </Card>
    );
  };

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

  const renderPromoterResult = () => (
    <Card>
      <Card.Header as="h5" className="bg-purple text-white">启动子强度预测结果</Card.Header>
      <Card.Body>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>预测相对强度</th>
              <th>置信区间</th>
              <th>可靠性评分</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{data.predicted_strength}</td>
              <td>{data.confidence_interval}</td>
              <td>{data.reliability_score}</td>
            </tr>
          </tbody>
        </Table>
        {data.sequence_features && (
          <div className="mt-4">
            <h6>序列特征分析</h6>
            <Table size="sm">
              <tbody>
                <tr>
                  <td>-10 box</td>
                  <td>{data.sequence_features.minus10_box}</td>
                </tr>
                <tr>
                  <td>-35 box</td>
                  <td>{data.sequence_features.minus35_box}</td>
                </tr>
                <tr>
                  <td>GC 含量</td>
                  <td>{data.sequence_features.gc_content}%</td>
                </tr>
              </tbody>
            </Table>
          </div>
        )}
      </Card.Body>
    </Card>
  );

  const renderRbsResult = () => (
    <Card>
      <Card.Header as="h5" className="bg-orange text-white">RBS翻译起始率预测结果</Card.Header>
      <Card.Body>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>预测翻译起始率</th>
              <th>置信区间</th>
              <th>可靠性评分</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{data.predicted_rate}</td>
              <td>{data.confidence_interval}</td>
              <td>{data.reliability_score}</td>
            </tr>
          </tbody>
        </Table>
        {data.sequence_features && (
          <div className="mt-4">
            <h6>序列特征分析</h6>
            <Table size="sm">
              <tbody>
                <tr>
                  <td>Shine-Dalgarno序列</td>
                  <td>{data.sequence_features.sd_sequence}</td>
                </tr>
                <tr>
                  <td>SD与起始密码子距离</td>
                  <td>{data.sequence_features.sd_distance}bp</td>
                </tr>
                <tr>
                  <td>二级结构自由能</td>
                  <td>{data.sequence_features.mfe_energy} kcal/mol</td>
                </tr>
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
      case 'promoter':
        return renderPromoterResult();
      case 'rbs':
        return renderRbsResult();
      default:
        return (
          <Card>
            <Card.Header as="h5" className="bg-primary text-white">预测结果</Card.Header>
            <Card.Body>
              <pre>{JSON.stringify(data, null, 2)}</pre>
            </Card.Body>
          </Card>
        );
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