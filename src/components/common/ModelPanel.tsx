import { useMemo } from "react";
import "aframe";
import type { FileViewDto } from "../../types/api-types";

interface Props {
    files?: FileViewDto[];
    onBack: () => void;
}

const ModelPanel = ({ files = [], onBack }: Props) => {
    // 1. Find the image texture
    const textureImage = useMemo(() => {
        return files.find(file =>
            ["jpeg", "jpg", "png"].includes(file.extension?.toLowerCase() || "")
        );
    }, [files]);

    // 2. Prepare the Image source
    const imageSrc = textureImage
        ? `data:image/${textureImage.extension};base64,${textureImage.base64StringFile}`
        : "";

    // 3. Define the entire scene as a string to bypass React's interference
    const aframeScene = `
      <a-scene embedded renderer="antialias: true; alpha: true; colorManagement: true;">
        <a-assets>
          <a-asset-item id="tshirt-obj" src="/models/t-shirt/Tshirt.obj"></a-asset-item>
          <a-asset-item id="tshirt-mtl" src="/models/t-shirt/Tshirt.mtl"></a-asset-item>
          <a-asset-item id="embroidery-obj" src="/models/embroidery/embroidery.obj"></a-asset-item>
          <img id="texture-img" src="${imageSrc}">
        </a-assets>

        <a-entity id="rig" position="0 0 0" look-controls="reverseMouseDrag: false">
          <a-camera position="0 0 5" wasd-controls="enabled: true"></a-camera>
        </a-entity>

        <a-entity position="0 -1.5 0">
          <a-entity obj-model="obj: #tshirt-obj; mtl: #tshirt-mtl" scale="10 10 10" rotation="0 -90 0"></a-entity>
          <a-entity obj-model="obj: #embroidery-obj" 
                    material="src: #texture-img; transparent: true; alphaTest: 0.5; side: double" 
                    scale="10 10 10" rotation="0 -90 0"></a-entity>
        </a-entity>

        <a-entity light="type: ambient; intensity: 1.5"></a-entity>
        <a-entity light="type: directional; intensity: 0.8" position="-1 2 2"></a-entity>
      </a-scene>
    `;

    return (
        <div className="container py-5">
            <h1 className="h4 mb-4 text-center">3D Model Preview</h1>

            <div className="row justify-content-center">
                <div className="col-lg-8">
                    {/* The Scene Container */}
                    <div
                        className="shadow rounded border bg-light"
                        style={{ height: "500px", width: "100%", overflow: "hidden" }}
                        // This prevents React from touching the 3D DOM
                        dangerouslySetInnerHTML={{ __html: aframeScene }}
                    />

                    <div className="mt-4 text-center">
                        <button className="btn btn-lg btn-outline-secondary w-50" onClick={onBack}>
                            Back to Profile
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModelPanel;