import React, { useState, useEffect } from "react";
import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import api from "../../api";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultySelectField from "../common/form/multySelectField";
import PropTypes from "prop-types";
const UserEditForm = ({ userId }) => {
    const [data, setData] = useState();
    useEffect(() => {
        api.users.getById(userId).then((data) => {
            setData({
                name: data.name,
                email: data.email,
                profession: data.profession._id,
                sex: data.sex,
                qualities: data.qualities.map((optionName) => ({
                    label: optionName.name,
                    value: optionName._id,
                    color: optionName.color
                }))
            });
        });
    }, []);
    const [qualities, setQualities] = useState([]);
    const [professions, setProfession] = useState([]);
    const [errors, setErrors] = useState({});
    useEffect(() => {
        api.professions.fetchAll().then((data) => {
            const professionsList = Object.keys(data).map((professionName) => ({
                label: data[professionName].name,
                value: data[professionName]._id
            }));
            setProfession(professionsList);
        });
        api.qualities.fetchAll().then((data) => {
            const qualitiesList = Object.keys(data).map((optionName) => ({
                label: data[optionName].name,
                value: data[optionName]._id,
                color: data[optionName].color
            }));
            setQualities(qualitiesList);
        });
    }, []);

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const validatorConfig = {
        name: {
            isRequired: {
                message: "Имя обязательно для заполнения"
            }
        },
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Email введен некорректно"
            }
        },
        profession: {
            isRequired: {
                message: "Обязательно выберите вашу профессию"
            }
        },
        licens: {
            isRequired: {
                message:
                    "Вы не можете использовать сервис без подтверждения лицензионного соглашения"
            }
        }
    };
    useEffect(() => {
        validate();
    }, [data]);
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;
    const getProfessionById = (id) => {
        for (const prof of professions) {
            if (prof.value === id) {
                return { _id: prof.value, name: prof.label };
            }
        }
    };
    const getQualities = (elements) => {
        const qualitiesArray = [];
        for (const elem of elements) {
            for (const quality in qualities) {
                if (elem.value === qualities[quality].value) {
                    qualitiesArray.push({
                        _id: qualities[quality].value,
                        name: qualities[quality].label,
                        color: qualities[quality].color
                    });
                }
            }
        }
        return qualitiesArray;
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        const { profession, qualities } = data;
        const newUserData = {
            ...data,
            profession: getProfessionById(profession),
            qualities: getQualities(qualities)
        };
        api.users.update(userId, newUserData);
    };
    return data ? (
        <div className="row">
            <div className="col-md-6 offset-md-3 shadow p-4">
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Имя"
                        name="name"
                        value={data.name}
                        onChange={handleChange}
                        error={errors.name}
                    />
                    <TextField
                        label="Электронная почта"
                        name="email"
                        value={data.email}
                        onChange={handleChange}
                        error={errors.email}
                    />

                    <SelectField
                        label="Выберите вашу профессию"
                        name="profession"
                        defaultOption="Choose..."
                        options={professions}
                        onChange={handleChange}
                        value={data.profession}
                        error={errors.profession}
                    />
                    <RadioField
                        label="Выберите ваш пол"
                        options={[
                            { name: "male", value: "male" },
                            { name: "female", value: "female" },
                            { name: "other", value: "other" }
                        ]}
                        onChange={handleChange}
                        value={data.sex}
                        name="sex"
                    />
                    <MultySelectField
                        label="Выберите ваши качества"
                        options={qualities}
                        defaultValue={data.qualities}
                        onChange={handleChange}
                        name="qualities"
                    />
                    <button
                        className="btn btn-primary w-100 mx-auto"
                        type="submit"
                        disabled={!isValid}
                    >
                        Обновить
                    </button>
                </form>
            </div>
        </div>
    ) : (
        <div>Loading</div>
    );
};
UserEditForm.propTypes = {
    userId: PropTypes.string
};
export default UserEditForm;
