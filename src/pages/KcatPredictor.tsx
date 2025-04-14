import React, { useState, useRef } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Overlay, Popover } from 'react-bootstrap';
// @ts-ignore
import { InfoCircle } from 'react-bootstrap-icons';
import SequenceInput from '../components/SequenceInput';
import ResultDisplay from '../components/ResultDisplay';
import { predictKcat, predictKcatWithFile, PredictionResponse } from '../services/api';

const KcatPredictor: React.FC = () => {
  // 定义样例数据
  const sampleProtein = "MENFKHLPEPWRLWDQRHVEPIDPVTLRAVVGASSQKTHLFLKGPTGEVPGDGCRLVSDSGVVELAKRAGVNCSVVRHEDIPAVSVLRSVDSGLRRLTAGGSPVFDSKAYTLLLGSLGVHPLVLGRIEDRRQLLKELGVPISVPVDCHFASIDPVMLQERLKSKDPIVERILFPGISFDLAKKVAAKMGTQHEVVIRGAAGAMCHAMVRGDAEAPGMLDEAIRETGYTVVSNPAFLHCAGIGARVALEEAKSRGIRVLHIKRSTGGGEVDLVNLDIKDIIETLKAGKADLLVNACETEYGITGDHLGLPATMSAILDAGDATTVEHFAAMLASRQPGAKVVTLGDGAVGSSVAFALLTRGERCAAALTMEVAGCDRIVEIAHGSGNVVTLEGTRGASVDAVRAGVRVQGHRVAAVGLAQPGAIEKFRVGDEADSVDALIDAGADTISVPLDIRNVFLGSSSLVAAGVACALGLPAYVFTATATMPVIAEHHAELVSSYLRQASAI";
  const sampleSmiles = "CC(=O)Nc1ccc(O)cc1";
  
  // 状态变量
  const [sequence, setSequence] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [substrate, setSubstrate] = useState<string>('');
  const [substrateFile, setSubstrateFile] = useState<File | null>(null);
  const [inputMode, setInputMode] = useState<'text' | 'file'>('text');
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<PredictionResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // 弹出框控制状态
  const [showProteinPopover, setShowProteinPopover] = useState(false);
  const [showSmilesPopover, setShowSmilesPopover] = useState(false);
  const proteinInfoRef = useRef(null);
  const smilesInfoRef = useRef(null);

  // 将样例数据填入输入框
  const applySampleProtein = () => {
    setSequence(sampleProtein);
    setFile(null);
    setShowProteinPopover(false);
  };

  const applySampleSmiles = () => {
    setSubstrate(sampleSmiles);
    setSubstrateFile(null);
    setInputMode('text');
    setShowSmilesPopover(false);
  };

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

  const handleSubstrateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubstrate(e.target.value);
    // 清除底物文件
    setSubstrateFile(null);
  };

  const handleSubstrateFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSubstrateFile(e.target.files[0]);
      // 切换到文件模式
      setInputMode('file');
      // 清除底物SMILES
      setSubstrate('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      // 验证输入
      const hasProtein = sequence || file;
      const hasSubstrate = inputMode === 'text' ? substrate : substrateFile;
      
      if (!hasProtein || !hasSubstrate) {
        setError('请输入蛋白质序列和底物SMILES，或上传相应文件');
        setLoading(false);
        return;
      }

      console.log('发送请求到后端...');
      if (sequence) {
        console.log('序列:', sequence);
        console.log('底物:', substrate);
      } else {
        console.log('使用文件上传');
      }

      let response;
      if (file) {
        // 使用文件预测
        console.log('调用API: predictKcatWithFile');
        response = await predictKcatWithFile(file, substrateFile);
      } else {
        // 使用序列预测
        console.log('调用API: predictKcat');
        response = await predictKcat(sequence, substrate);
      }

      console.log('收到后端响应:', response);
      
      if (!response.success) {
        // 处理错误响应
        if (response.error && response.error.includes('模型文件不存在')) {
          setError('预测服务暂时不可用：预测模型未加载或不存在。请联系系统管理员。');
        } else if (response.error && response.error.includes('预测脚本不存在')) {
          setError('预测服务暂时不可用：预测脚本未找到。请联系系统管理员。');
        } else {
          setError(response.error || '预测过程中发生未知错误');
        }
      } else {
        setResult(response);
      }
    } catch (err: any) {
      const errorMessage = '预测请求失败: ' + (err.message || '未知错误');
      setError(errorMessage);
      console.error('API调用错误:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <h1 className="mb-4">Kcat预测</h1>
      <Alert variant="info" className="mb-3">
        <strong>平台说明：</strong> 本平台使用经过训练和验证的机器学习模型，确保预测结果的科学性和准确性。系统不会使用随机模拟数据，保证预测的严谨性。
      </Alert>
      <p className="lead mb-4">
        通过深度学习模型预测酶促反应的催化常数(Kcat)，帮助酶工程设计和优化。
      </p>

      <Row>
        <Col lg={8}>
          <Card className="shadow-sm">
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <div className="d-flex align-items-center mb-3">
                  <h5 className="mb-0 me-2">输入蛋白质序列</h5>
                  <span 
                    ref={proteinInfoRef} 
                    onClick={() => setShowProteinPopover(!showProteinPopover)}
                    style={{ cursor: 'pointer' }}
                  >
                    <InfoCircle className="text-primary ms-1" />
                  </span>
                  
                  <Overlay
                    show={showProteinPopover}
                    target={proteinInfoRef.current}
                    placement="right"
                    container={proteinInfoRef.current}
                    containerPadding={20}
                    rootClose
                    onHide={() => setShowProteinPopover(false)}
                  >
                    <Popover id="popover-protein-sample" style={{ maxWidth: '350px' }}>
                      <Popover.Header as="h6">样例蛋白质序列</Popover.Header>
                      <Popover.Body>
                        <div style={{ fontSize: '0.8rem', wordBreak: 'break-all' }}>
                          {sampleProtein.substring(0, 50)}...
                        </div>
                        <Button 
                          variant="primary" 
                          size="sm" 
                          className="mt-2" 
                          onClick={applySampleProtein}
                        >
                          使用此样例
                        </Button>
                      </Popover.Body>
                    </Popover>
                  </Overlay>
                </div>
                <SequenceInput 
                  sequence={sequence}
                  onSequenceChange={handleSequenceChange}
                  file={file}
                  onFileChange={handleFileChange}
                  placeholder="请输入蛋白质氨基酸序列 (FASTA格式或纯序列)"
                  sequenceType="protein"
                />

                <div className="mt-4 mb-4">
                  <div className="d-flex align-items-center mb-3">
                    <h5 className="mb-0 me-2">输入底物信息</h5>
                    <span 
                      ref={smilesInfoRef} 
                      onClick={() => setShowSmilesPopover(!showSmilesPopover)}
                      style={{ cursor: 'pointer' }}
                    >
                      <InfoCircle className="text-primary ms-1" />
                    </span>
                    
                    <Overlay
                      show={showSmilesPopover}
                      target={smilesInfoRef.current}
                      placement="right"
                      container={smilesInfoRef.current}
                      containerPadding={20}
                      rootClose
                      onHide={() => setShowSmilesPopover(false)}
                    >
                      <Popover id="popover-smiles-sample">
                        <Popover.Header as="h6">样例底物SMILES</Popover.Header>
                        <Popover.Body>
                          <div style={{ fontSize: '0.9rem' }}>
                            {sampleSmiles}
                          </div>
                          <div style={{ fontSize: '0.8rem', fontStyle: 'italic' }}>
                            (对乙酰氨基酚)
                          </div>
                          <Button 
                            variant="primary" 
                            size="sm" 
                            className="mt-2" 
                            onClick={applySampleSmiles}
                          >
                            使用此样例
                          </Button>
                        </Popover.Body>
                      </Popover>
                    </Overlay>
                  </div>
                  <div className="d-flex gap-3 mb-3">
                    <Form.Check
                      type="radio"
                      id="substrate-text"
                      label="直接输入SMILES"
                      checked={inputMode === 'text'}
                      onChange={() => setInputMode('text')}
                    />
                    <Form.Check
                      type="radio"
                      id="substrate-file"
                      label="上传SMILES文件"
                      checked={inputMode === 'file'}
                      onChange={() => setInputMode('file')}
                    />
                  </div>
                  
                  {inputMode === 'text' ? (
                    <Form.Control
                      type="text"
                      placeholder="输入底物的SMILES表示 (例如：CC(=O)Nc1ccc(O)cc1)"
                      value={substrate}
                      onChange={handleSubstrateChange}
                    />
                  ) : (
                    <Form.Control
                      type="file"
                      accept=".smi,.txt"
                      onChange={handleSubstrateFileChange}
                    />
                  )}
                  <Form.Text className="text-muted">
                    支持SMILES格式描述底物结构，例如对乙酰氨基酚：CC(=O)Nc1ccc(O)cc1
                  </Form.Text>
                </div>

                <div className="d-grid gap-2 mt-4">
                  <Button 
                    variant="primary" 
                    type="submit" 
                    size="lg" 
                    disabled={loading || !(
                      // 有效的蛋白质输入
                      (sequence || file) && 
                      // 有效的底物输入
                      (
                        (inputMode === 'text' && substrate) || 
                        (inputMode === 'file' && substrateFile)
                      )
                    )}
                  >
                    {loading ? '预测中...' : '预测Kcat值'}
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
                  resultType="kcat"
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
                Kcat预测工具可以预测给定蛋白质酶对特定底物的催化常数。
              </p>
              <hr />
              <h6>输入参数</h6>
              <ul>
                <li>蛋白质序列：酶的氨基酸序列</li>
                <li>底物SMILES：底物分子的SMILES表示</li>
              </ul>
              <hr />
              <h6>结果解读</h6>
              <p>
                Kcat值(s<sup>-1</sup>)表示每个酶分子每秒转化的底物分子数量。预测结果包含预测值、置信区间和可靠性评分。
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default KcatPredictor; 