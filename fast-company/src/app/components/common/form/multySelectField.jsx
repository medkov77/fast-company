import React from "react";
import Select from "react-select";
import PropTypes from "prop-types";
const MultySelectField = ({ options, onChange, name, label, defaultValue }) => {
    const optionsArray =
        !Array.isArray(options) && typeof options === "object"
            ? Object.values(options)
            : options;
    const handleChange = (value) => {
        onChange({ name: name, value });
    };
    console.log("opt", optionsArray[0]);

    return (
        <div className="mb-4">
            <label className="form-label">{label}</label>
            <Select
                isMulti
                defaultValue={[optionsArray[0], optionsArray[1]]}
                options={optionsArray}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={handleChange}
                name={name}
                closeMenuOnSelect={false}
            />
        </div>
    );
};

MultySelectField.propTypes = {
    options: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    onChange: PropTypes.func,
    name: PropTypes.string,
    label: PropTypes.string,
    defaultValue: PropTypes.array
};
export default MultySelectField;
