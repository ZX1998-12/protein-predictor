import React from 'react';
import { Container, Row, Col, Card, Tab, Nav } from 'react-bootstrap';

const Api: React.FC = () => {
  return (
    <Container>
      <Row className="mb-4">
        <Col>
          <h2 className="text-primary">API接口文档</h2>
          <p className="lead">
            通过API集成蛋白质特性预测功能到您自己的应用程序
          </p>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Tab.Container id="api-tabs" defaultActiveKey="overview">
                <Row>
                  <Col md={3}>
                    <Nav variant="pills" className="flex-column">
                      <Nav.Item>
                        <Nav.Link eventKey="overview">概述</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="authentication">认证</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="endpoints">接口端点</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="examples">使用示例</Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </Col>
                  <Col md={9}>
                    <Tab.Content>
                      <Tab.Pane eventKey="overview">
                        <h4>API概述</h4>
                        <p>
                          我们提供RESTful API接口，允许开发者将蛋白质特性预测功能集成到自己的应用程序中。
                          所有API请求和响应均使用JSON格式，支持批量预测和异步处理。
                        </p>
                        <p>
                          API基础URL: <code>https://api.protein-predictor.example.com/v1</code>
                        </p>
                      </Tab.Pane>
                      
                      <Tab.Pane eventKey="authentication">
                        <h4>认证</h4>
                        <p>
                          所有API请求需要通过API密钥进行认证。您可以在个人账户页面申请和管理API密钥。
                          API密钥应包含在请求头中：
                        </p>
                        <pre>
                          {`Authorization: Bearer YOUR_API_KEY`}
                        </pre>
                      </Tab.Pane>
                      
                      <Tab.Pane eventKey="endpoints">
                        <h4>接口端点</h4>
                        <div className="mb-4">
                          <h5>Kcat预测</h5>
                          <code>POST /predict/kcat</code>
                          <p>请求体示例:</p>
                          <pre>{`{
  "sequence": "MVKTVVTGFGAVGGGFVMRLFEQ...",
  "substrate": "CC(=O)Nc1ccc(O)cc1"
}`}</pre>
                        </div>
                        
                        <div className="mb-4">
                          <h5>Km预测</h5>
                          <code>POST /predict/km</code>
                          <p>请求体示例同Kcat预测</p>
                        </div>
                        
                        <div className="mb-4">
                          <h5>Tm预测</h5>
                          <code>POST /predict/tm</code>
                          <p>请求体示例:</p>
                          <pre>{`{
  "sequence": "MVKTVVTGFGAVGGGFVMRLFEQ..."
}`}</pre>
                        </div>
                        
                        <div className="mb-4">
                          <h5>溶解度预测</h5>
                          <code>POST /predict/solubility</code>
                          <p>请求体示例同Tm预测</p>
                        </div>
                      </Tab.Pane>
                      
                      <Tab.Pane eventKey="examples">
                        <h4>使用示例</h4>
                        <p>使用Python请求Kcat预测：</p>
                        <pre>{`import requests

api_key = "YOUR_API_KEY"
url = "https://api.protein-predictor.example.com/v1/predict/kcat"

headers = {
    "Authorization": f"Bearer {api_key}",
    "Content-Type": "application/json"
}

data = {
    "sequence": "MVKTVVTGFGAVGGGFVMRLFEQ...",
    "substrate": "CC(=O)Nc1ccc(O)cc1"
}

response = requests.post(url, json=data, headers=headers)
result = response.json()

print(result)`}</pre>
                      </Tab.Pane>
                    </Tab.Content>
                  </Col>
                </Row>
              </Tab.Container>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Api; 