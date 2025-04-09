import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const About: React.FC = () => {
  return (
    <Container>
      <Row className="mb-4">
        <Col>
          <h2 className="text-primary">关于我们</h2>
          <p className="lead">
            我们致力于通过人工智能技术推动蛋白质工程的创新
          </p>
        </Col>
      </Row>

      <Row>
        <Col>
          <h4>项目简介</h4>
          <p>
            蛋白质特性预测平台是一个基于深度学习的在线预测工具，旨在为科研人员和工业用户提供快速、准确的蛋白质特性预测服务。
            通过输入蛋白质序列，您可以获得包括Kcat、Km、Tm和溶解度等重要参数的预测结果。
          </p>
          
          <h4>技术特点</h4>
          <p>
            我们的预测模型基于最新的深度学习算法，通过大量实验数据训练而成。平台支持多种输入方式，包括直接序列输入和文件上传，
            为用户提供便捷的使用体验。预测结果包含详细的参数信息和可视化展示，帮助用户更好地理解和应用预测数据。
          </p>
          
          <h4>应用领域</h4>
          <p>
            本平台可广泛应用于生物技术、制药、化工、食品等领域的研发工作，帮助研究人员筛选和优化蛋白质，
            加速新产品的开发进程，降低实验成本。
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default About; 