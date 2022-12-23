import { jsPDF, HTMLOptionImage } from "jspdf";
import { toPng, toCanvas } from "html-to-image";
import { Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";

const GeneratePdf = ({ html }) => {
  const generateImage = async () => {
    const image = await toPng(html.current, { quality: 0.95 });
    const doc = new jsPDF("l", "mm", [500, 250]);

    // doc.addImage(image, "JPEG", 5, 22, 200, 160);
    doc.addImage(image, "JPEG", 0, 0, 500, 250);

    doc.save();
  };

  return (
    <div className="button-container">
      <Button onClick={generateImage} type="primary" style={{ width: "100%", }}>
        <DownloadOutlined />
        Download
      </Button>
    </div>
  );
};

export default GeneratePdf;
