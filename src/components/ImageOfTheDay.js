import React from 'react';

export default function ImageOfTheDay({ useImgUrl }) {
  return (
    <div
      style={{
        padding: 50,
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        width: '50vw',
        fontFamily: 'Roboto',
        wordSpacing: 1.4,
        fontSize: 15,
      }}
    >
      <div style={{ fontWeight: 'bold' }}>
        {useImgUrl && useImgUrl.title ? useImgUrl.title : null}
      </div>
      <div
        style={{
          backgroundPosition: 'center',
          backgroundImage: `url(${useImgUrl ? useImgUrl.url : null})`,
          height: 400,
          width: 400,
        }}
      />
      {useImgUrl && useImgUrl.explanation ? useImgUrl.explanation : null}
    </div>
  );
}
