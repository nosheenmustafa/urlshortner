import React from 'react';
import QRCode from 'react-qr-code';

export default function QRCodeBox({url}){
  return(<>
      <QRCode value={url} className="w-32 h-32"/>
    </>);
}
