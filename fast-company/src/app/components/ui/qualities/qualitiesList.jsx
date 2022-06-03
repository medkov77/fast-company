import React from "react";
import PropTypes from "prop-types";
import Quality from "./quality";
import { useQualitiess } from "../../../hooks/useQualities";

const QualitiesList = ({ qualities }) => {
    const { getQuality } = useQualitiess();
    console.log(qualities, "qua");
    return (
        <>
            {qualities.map((qual) => (
                <Quality key={qual} {...getQuality(qual)} />
            ))}
        </>
    );
};

QualitiesList.propTypes = {
    qualities: PropTypes.array
};

export default QualitiesList;
