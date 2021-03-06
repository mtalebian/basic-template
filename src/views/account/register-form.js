import { Form, Formik } from "formik";
import { BasicInput } from "../../components/basic-form/basic-input";
import * as bs from "react-basic-design";

export default function RegisterForm() {
    const formRef = useRef();
    const initialValue = {
        userName: "",
        password: "",
        captcha: "",
    };
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    const MaritalStatusList = [
        { code: "0", title: "Single" },
        { code: "1", title: "Married" },
        { code: "2", title: "Widowed" },
        { code: "3", title: "Divorced" },
    ];
    const Cities = [
        { code: 1, title: "Tehran" },
        { code: 2, title: "Karaj" },
        { code: 3, title: "Isfahan" },
        { code: 4, title: "Sari" },
    ];

    const onSubmit = async (values) => {
        await sleep(300);
        window.alert(JSON.stringify(values, 0, 2));
    };

    return (
        // <Form
        //     initialValues={{ maritalStatus: "1" }}
        //     onSubmit={onSubmit}
        //     validate={myValidator.validate}
        //     render={({ handleSubmit, form, submitting, pristine, invalid, values }) => (
        //         <form onSubmit={handleSubmit} className="form register" style={{ maxWidth: 550 }}>
        //             <h3>CREATE ACCOUNT</h3>
        //             <span>Please fill in this form to create an account</span>
        //             <hr />
        //             <div className="row">
        //                 <div className="col-6">
        //                     <bs.FinalField name="firstName" label="First Name" autoFocus />
        //                 </div>
        //                 <div className="col-6">
        //                     <bs.FinalField name="lastName" label="Last Name" />
        //                 </div>
        //             </div>
        //             <div className="row">
        //                 <div className="col-6">
        //                     <bs.FinalSelect name="city" label="City" values={Cities} placeholder="choose ..." />
        //                 </div>
        //                 <div className="col-6">
        //                     <bs.FinalField name="lastName" label="Last Name" />
        //                 </div>
        //             </div>
        //             <hr className="mt-0" />

        //             <bs.FinalRadio name="maritalStatus" label="Marital Status" labelSize={4} values={MaritalStatusList} />

        //             <hr />
        //             <bs.FinalField name="username" label="User Name" labelSize={4} />
        //             <bs.FinalField name="password" label="Password" type="password" labelSize={4} />
        //             <bs.FinalField name="confirmPassword" label="Confirm Password" type="password" labelSize={4} />
        //             <div className="row">
        //                 <div className="col-4"></div>
        //                 <div className="col-8">
        //                     <bs.FinalCheck name="iAgree" label="I agree to the Term of service and Privacy Policy" disabled={invalid} />
        //                 </div>
        //             </div>
        //             <hr />
        //             <div className="row">
        //                 <div className="col-4"></div>
        //                 <div className="col-8">
        //                     <Captcha />
        //                 </div>
        //             </div>

        //             <bs.FinalCheck name="iAgree" label="I agree to the Term of service and Privacy Policy" />
        //             <button className="btn btn-block btn-warning" type="submit" disabled={submitting || invalid}>
        //                 SIGN UP
        //             </button>

        //             <p>
        //                 Have you already an account?{" "}
        //                 <a className="text-danger" href="/account/login">
        //                     login here
        //                 </a>
        //             </p>
        //         </form>
        //     )}
        // />
        <div className="form register" style={{ maxWidth: 550 }}>
            <Formik
                initialValues={initialValue}
                validationSchema={yup.object({
                    userName: yup.string().required("required"),
                    password: yup.string().required("required"),
                    captcha: yup.string().required("required"),
                })}
                onSubmit={onSubmit}
                innerRef={formRef}
            >
                <Form>
                    <h3>CREATE ACCOUNT</h3>
                    <span>Please fill in this form to create an account</span>
                    <hr />
                    <div className="row">
                        <div className="col-6">
                            <BasicInput className="mb-2" name="firstName" placeholder="first Name" type="text" autoComplete="off" autoFocus />
                        </div>
                        <div className="col-6">
                            <BasicInput className="mb-2" name="lastName" placeholder="lastName" type="lastName" />
                        </div>
                    </div>
                </Form>
            </Formik>
        </div>
    );
}
