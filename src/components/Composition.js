import CopyToClipboard from "react-copy-to-clipboard";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Composition = ({ name, data, compositionId, deleteUserComposition }) => {
  const link = window.location.origin + "/" + compositionId;

  const copyComposition = () => {
    toast.success("Link copied !", {
      position: "top-center",
    });
  }

  const getBorderColor = (cost) => {
    switch (cost) {
      case 1:
        return "grey";
      case 2:
        return "#009600";
      case 3:
        return "#1E82FF";
      case 4:
        return "#C800C8";
      case 5:
        return "#FFC800";
      default:
        break;
    }
  };

  return (
    <div className="composition-card">
      <div className="composition-card-block">
        <p>{name}</p>
        <div className="composition-images">
          {data.map((element, index) =>
            element.imageUrl && (
              <img
                key={index}
                src={element.imageUrl}
                alt=""
                style={{ border: `1px solid ${getBorderColor(element.cost)}` }}
              />
            )
          )}
        </div>
      </div>
      <CopyToClipboard text={link}>
          <button onClick={copyComposition} className="button1">Copy</button>
      </CopyToClipboard>
      <button className="button1" onClick={() => deleteUserComposition(compositionId)}>Delete</button>
    </div>
  );
}

export default Composition;
