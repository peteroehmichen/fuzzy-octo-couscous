import { format } from "date-fns";
import { Fragment } from "react";

export default function DateInTable({ editMode, editedTime, loggedTime }) {
    if (!loggedTime) return null;

    return (
        <Fragment>
            {!editMode && format(loggedTime, "dd.MM.yyyy', um 'HH:mm' Uhr'")}
            {editMode && loggedTime && (
                <input
                    type="datetime-local"
                    value={format(loggedTime, "yyy-MM-dd'T'HH:mm")}
                    onChange={(e) => {
                        editedTime(e.target.value);
                    }}
                />
            )}
        </Fragment>
    );
}
