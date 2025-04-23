import React from 'react';
import QRCode from 'react-qr-code';

export default function QRCodeBox({ url }) {
  return (
    <div>
      <QRCode value={url} size={128} />
    </div>
  );
}
