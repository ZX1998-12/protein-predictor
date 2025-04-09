import React from 'react';
import { Container, Row, Col, Accordion } from 'react-bootstrap';

const Faq: React.FC = () => {
  return (
    <Container>
      <Row className="mb-4">
        <Col>
          <h2 className="text-primary">常见问题</h2>
          <p className="lead">
            关于蛋白质特性预测平台的常见问题和解答
          </p>
        </Col>
      </Row>

      <Row>
        <Col>
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>如何使用预测功能？</Accordion.Header>
              <Accordion.Body>
                您可以在首页选择要预测的蛋白质特性（Kcat、Km、Tm或溶解度），然后按照页面指引输入蛋白质序列。
                输入方式有两种：直接输入氨基酸序列或上传FASTA格式文件。对于需要底物信息的预测（如Kcat和Km），
                还需要提供底物的SMILES表示。提交后系统会进行计算并展示预测结果。
              </Accordion.Body>
            </Accordion.Item>
            
            <Accordion.Item eventKey="1">
              <Accordion.Header>预测结果的准确性如何？</Accordion.Header>
              <Accordion.Body>
                我们的预测模型基于大量实验数据训练，在测试集上表现出良好的预测准确性。但需要注意，预测结果仍然是一种理论估计，
                实际应用中可能存在一定误差。我们建议将预测结果作为实验设计和筛选的参考，而非最终决策依据。
              </Accordion.Body>
            </Accordion.Item>
            
            <Accordion.Item eventKey="2">
              <Accordion.Header>支持哪些类型的蛋白质？</Accordion.Header>
              <Accordion.Body>
                目前我们的平台主要支持酶类蛋白质的特性预测，包括但不限于水解酶、转移酶、氧化还原酶等。对于一些特殊类型的蛋白质或非天然氨基酸序列，
                预测准确性可能会受到影响。我们正在持续扩充训练数据，以提高对更多蛋白质类型的预测支持。
              </Accordion.Body>
            </Accordion.Item>
            
            <Accordion.Item eventKey="3">
              <Accordion.Header>如何引用此平台的预测结果？</Accordion.Header>
              <Accordion.Body>
                如果您在科研工作中使用了我们的预测结果，请引用我们的相关论文（详见"关于"页面）。
                我们也非常欢迎用户反馈预测结果的实验验证情况，这将帮助我们不断改进预测模型。
              </Accordion.Body>
            </Accordion.Item>
            
            <Accordion.Item eventKey="4">
              <Accordion.Header>提交的数据是否安全？</Accordion.Header>
              <Accordion.Body>
                我们高度重视用户数据安全。默认情况下，您提交的蛋白质序列和底物信息仅用于当前预测，不会永久存储或用于其他用途。
                如果您希望系统不保留任何数据，可以在使用后清除浏览器缓存。
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>
      </Row>
    </Container>
  );
};

export default Faq; 