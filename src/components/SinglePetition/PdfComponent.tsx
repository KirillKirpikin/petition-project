import React from "react";

interface IPdfComponentProps {
    link: string
}

const PdfComponent:React.FC<IPdfComponentProps> = ({link}) => {
    return (
        <div>
        <iframe
          src={`https://cdn.ednipro.dp.ua/static/documents/${link}.pdf`}
          title="PDF Viewer"
          width="100%"
          height="500px"
        ></iframe>
      </div>
    );
}

export default PdfComponent