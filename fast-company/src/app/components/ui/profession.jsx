import React from "react";

import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import {
    getprofessionsLoadingStatus,
    getProfession
} from "../../store/professions";
const Profession = ({ id }) => {
    const isLoading = useSelector(getprofessionsLoadingStatus());

    const prof = useSelector(getProfession(id));
    if (!isLoading) {
        return <p>{prof.name}</p>;
    } else return "Loading...";
};
Profession.propTypes = {
    id: PropTypes.string
};
export default Profession;
