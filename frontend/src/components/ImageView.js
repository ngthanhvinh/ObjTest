import React from 'react';
import "../bootstrap/css/bootstrap.css";
import "./image-view.css";
import upload from "./upload.svg";
import image from "./image.svg";

function ImageView(props) {
    // props: {imgFile, onChange, disabled}
    return (
        <div className="card bg-light" style={props.imgFile === null ? {height: "500px"} : {}}>
            {props.imgFile != null ?
                <img className="card-img-top img-fluid img-thumbnail" src={props.imgFile} alt="" />
                :
                <div className="mx-auto">
                    <img src={image} alt="" />
                    <span className="text-*-center">
                        <strong>Click the button on the top-left corner to upload an image!</strong>
                    </span>
                </div>
            }
            <div className="card-img-overlay">
		{props.disabled ? <div /> : 
			<div>
				<input
				    className="inputfile"
				    type="file"
				    id="file"
				    accept="image/*"
				    onChange={(event) => props.onChange(event)}
				/>
				<label htmlFor="file">
				    <img className="upload" src={upload} alt="Upload" />
				</label>
			</div>
		}
            </div>
        </div>
    );
}

export default ImageView;
