import { ErrorMessage, Form, Formik } from 'formik';
import MyTextInput from '../../app/common/form/MyTextInput';
import { Button, Header, Label } from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { IUserFormValues } from '../../app/models/user';
import * as Yup from 'yup';
import ValidationErrors from '../errors/ValidationErrors';

export default observer(function RegisterForm() {
    const { userStore } = useStore();
    const navigate = useNavigate();

    function handleSubmit(value: IUserFormValues, setErrors: Function, setSubmitting: Function) {
        userStore
            .register(value)
            .then(value => navigate('/activities'))
            .catch(error => setErrors({ error }))
            .finally(() => setSubmitting(false));
    }

    return (
        <Formik
            initialValues={{
                displayName: '',
                username: '',
                email: '',
                password: '',
                error: null,
            }}
            onSubmit={(value, { setErrors, setSubmitting }) =>
                handleSubmit(value, setErrors, setSubmitting)
            }
            validationSchema={Yup.object({
                displayName: Yup.string().required(),
                username: Yup.string().required(),
                email: Yup.string().required().email(),
                password: Yup.string().required(),
            })}
        >
            {({ handleSubmit, isValid, dirty, isSubmitting, errors }) => (
                <Form className="ui form error" onSubmit={handleSubmit} autoComplete="off">
                    <Header
                        as="h2"
                        content="Sign up to Reactivities"
                        color="teal"
                        textAlign="center"
                    />
                    <MyTextInput name="displayName" placeholder="Display Name" />
                    <MyTextInput name="username" placeholder="Username" />
                    <MyTextInput name="email" placeholder="Email" />
                    <MyTextInput name="password" placeholder="Password" type="password" />

                    <ErrorMessage
                        name="error"
                        render={() => <ValidationErrors errors={errors.error} />}
                    />

                    <Button
                        positive
                        content="Register"
                        type="submit"
                        fluid
                        loading={isSubmitting}
                        disabled={!isValid || !dirty || isSubmitting}
                    />
                </Form>
            )}
        </Formik>
    );
});
