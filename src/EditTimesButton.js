import { Fragment } from "react";

export default function EditTimesButton({
    purpose,
    editMode,
    toggleBlocks,
    disabled,
}) {
    const editBtn = (
        <button
            disabled={disabled}
            onClick={() => {
                toggleBlocks();
            }}
        >
            {purpose === "edit" ? "Bearbeiten" : "Löschen"}
        </button>
    );

    const confirmBtn = (
        <Fragment>
            <button
                onClick={() => {
                    toggleBlocks("cancel");
                }}
            >
                {" "}
                Abbrechen
            </button>
            <button
                onClick={() => {
                    toggleBlocks("confirm");
                }}
            >
                {purpose === "edit" ? "Bearbeiten" : "Löschen"}
            </button>
        </Fragment>
    );

    return editMode ? confirmBtn : editBtn;
}
