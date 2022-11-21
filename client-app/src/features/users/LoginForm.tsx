import { ErrorMessage, Form, Formik, FormikValues } from 'formik';
import MyTextInput from '../../app/common/form/MyTextInput';
import { Button, Label } from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { IUserFormValues } from '../../app/models/user';

export default observer(function LoginForm() {
    const { userStore } = useStore();
    const navigate = useNavigate();

    function handleSubmit(value: IUserFormValues, setErrors: Function) {
        userStore
            .login(value)
            .then(value => navigate('/activities'))
            .catch(error => setErrors({ error: 'Invalid email or password' }));
    }

    return (
        <Formik
            initialValues={{ email: '', password: '', error: null }}
            onSubmit={(value, { setErrors }) => handleSubmit(value, setErrors)}
        >
            {({ handleSubmit, isValid, isSubmitting, errors }) => (
                <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
                    <MyTextInput name="email" placeholder="Email" />
                    <MyTextInput name="password" placeholder="Password" type="password" />

                    <ErrorMessage
                        name="error"
                        render={() => (
                            <Label
                                style={{ marginBottom: 10 }}
                                basic
                                color="red"
                                content={errors.error}
                            />
                        )}
                    />

                    <Button
                        positive
                        content="Login"
                        type="submit"
                        fluid
                        loading={isSubmitting}
                        disabled={!isValid || isSubmitting}
                    />
                </Form>
            )}
        </Formik>
    );
});
