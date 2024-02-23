import React, { useState } from 'react';
import QRCode from 'qrcode';
import './App.css';

function App() {
  const [url, setUrl] = useState('');
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const generateQrCode = async () => {
    if (!url) {
      setErrorMessage('Enter The Url');
      setTimeout(() => {
        setErrorMessage('');
      }, 5000);
      return;
    }

    try {
      const dataUrl = await QRCode.toDataURL(url);
      setQrCodeDataUrl(dataUrl);
    } catch (error) {
      console.error('Error generating QR code:', error);
      setQrCodeDataUrl('');
    }
  };

  const clear = () => {
    setUrl('');
    setQrCodeDataUrl('');
  };

  const download = () => {
    if (qrCodeDataUrl) {
      const link = document.createElement('a');
      link.download = 'qrCode.png';
      link.href = qrCodeDataUrl;
      link.click();
    }
  };

  return (
    <div className="container">
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <div>
        <input
          className="input"
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter URL"
        />
        <button className="button button-primary" onClick={generateQrCode}>
          Generate
        </button>
        <button className="button button-secondary" onClick={clear}>
          Clear
        </button>
        {qrCodeDataUrl ? (
          <button className="button button-success" onClick={download}>
            Download
          </button>
        ) : null}
      </div>
      {qrCodeDataUrl && (
        <div className="qr-code-container">
          <img className="qr-code" src={qrCodeDataUrl} alt="qr-code" />
        </div>
      )}
    </div>
  );
  
}

export default App;
