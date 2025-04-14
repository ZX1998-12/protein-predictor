import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Tabs, Tab } from 'react-bootstrap';

// 蛋白质预测选项数据
const proteinPredictionOptions = [
  {
    id: 'kcat',
    title: 'Kcat预测',
    description: '预测酶促反应的催化常数(Kcat)',
    icon: '🔬',
    color: '#4285F4',
    path: '/predict/kcat'
  },
  {
    id: 'km',
    title: 'Km预测',
    description: '预测米氏常数(Km)',
    icon: '🧪',
    color: '#EA4335',
    path: '/predict/km'
  },
  {
    id: 'tm',
    title: 'Tm预测',
    description: '预测蛋白质的熔点(Tm)',
    icon: '🌡️',
    color: '#FBBC05',
    path: '/predict/tm'
  },
  {
    id: 'solubility',
    title: '溶解度预测',
    description: '预测蛋白质的溶解度',
    icon: '💧',
    color: '#34A853',
    path: '/predict/solubility'
  }
];

// 基因预测选项数据
const genePredictionOptions = [
  {
    id: 'promoter',
    title: '启动子强度预测',
    description: '预测启动子的表达强度',
    icon: '🧬',
    color: '#9C27B0',
    path: '/predict/promoter'
  },
  {
    id: 'rbs',
    title: 'RBS翻译起始率预测',
    description: '预测核糖体结合位点的翻译起始率',
    icon: '🧫',
    color: '#FF9800',
    path: '/predict/rbs'
  }
];

const Home: React.FC = () => {
  return (
    <Container>
      <div className="mb-5 text-center">
        <h1 className="display-4 mb-3">生物信息学预测平台</h1>
        <p className="lead">
          使用先进的深度学习算法，预测蛋白质和基因的各种特性，助力科研与工业应用
        </p>
      </div>

      <Tabs
        defaultActiveKey="protein"
        id="prediction-tabs"
        className="mb-4"
        justify
      >
        <Tab eventKey="protein" title="蛋白质预测">
          <Row className="g-4 mt-2">
            {proteinPredictionOptions.map(option => (
              <Col key={option.id} md={6} lg={3}>
                <Link to={option.path} className="text-decoration-none">
                  <Card className="protein-card border-0 shadow-sm h-100">
                    <div className="card-img-container">
                      <span className="protein-icon display-1">{option.icon}</span>
                    </div>
                    <Card.Body>
                      <Card.Title style={{ color: option.color }}>{option.title}</Card.Title>
                      <Card.Text className="text-muted">{option.description}</Card.Text>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
        </Tab>
        
        <Tab eventKey="gene" title="基因预测">
          <Row className="g-4 mt-2">
            {genePredictionOptions.map(option => (
              <Col key={option.id} md={6} lg={6}>
                <Link to={option.path} className="text-decoration-none">
                  <Card className="protein-card border-0 shadow-sm h-100">
                    <div className="card-img-container">
                      <span className="protein-icon display-1">{option.icon}</span>
                    </div>
                    <Card.Body>
                      <Card.Title style={{ color: option.color }}>{option.title}</Card.Title>
                      <Card.Text className="text-muted">{option.description}</Card.Text>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
        </Tab>
      </Tabs>

      <div className="mt-5 pt-4 text-center">
        <h2>快速高效的预测工具</h2>
        <p className="text-muted">
          我们的预测算法基于最新的机器学习模型，通过大量实验数据训练，提供快速、准确的生物信息学预测结果。
        </p>
      </div>
    </Container>
  );
};

export default Home; 