import React from 'react'
import { Form, Field } from 'react-final-form'

import './index.scss'
import * as bs from 'react-basic-design';
import BasicValidator from "basic-data-validator";



export default function AccountTestForm() {
    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
    const FavoriteColors = [{ code: '#ff0000', title: '❤️ Red' }, { code: '#00ff00', title: '💚 Green' }, { code: '#0000ff', title: '💙 Blue' }]
    const Toppings = [{ code: 'chicken', title: '🐓 Chicken' }, { code: 'ham', title: '🐷 Ham' }, { code: 'mushrooms', title: '🍄 Mushrooms' }, { code: "cheese", title: "🧀 Cheese" }, { code: "tuna", title: "🐟 Tuna" }, { code: "pineapple", title: "🍍 Pineapple" }];
    const Stooges = [{ code: 'larry', title: 'Larry' }, { code: 'moe', title: 'Moe' }, { code: 'curly', title: 'Curly' }];
    const Sauces = ["ketchup", "mustard", "mayonnaise", "guacamole"];

    const onSubmit = async values => {
        await sleep(300)
        window.alert(JSON.stringify(values, 0, 2))
    }



    const formValidator = BasicValidator(builder => builder.object({
        firstName:
            builder.label("First Name").string().required().min(3).max(5).notOneOf(['123', 'abc']).custom(v => v !== '11', 'every thing exept 11'),
        birthDate:
            builder.label("Birth Date").shamsi().required().min("1390/01/01").max("1400/02/11"),
        email:
            builder.string().required().email().custom(v => !!v && v.toLowerCase().endsWith('gmail.com'), 'just gmail account allowd'),
        website:
            builder.string().required().url(),
        age:
            builder.number().required().notOneOf([2, 7, 8]),
        employed:
            builder.bool().equals(true),
        notes:
            builder.string().required(),
        address:
            builder.label('ADDRESS').object({
                //country:
                //    builder.string().required(),
                city:
                    builder.label('CITY').string().required(),
            }).required()
    }));


    return (
        <>
            <Form
                onSubmit={onSubmit}
                initialValues={{ stooge: 'larry', employed: true, toppings: ['ham', 'cheese'], sauces: ['ketchup', 'mayonnaise'] }}
                validate={formValidator.validate}

                render={({ handleSubmit, form, submitting, pristine, values, initialValues, ...args }) => (
                    <form onSubmit={handleSubmit} className="form m-4" style={{ maxWidth: 1000 }}>
                        <div className="row">
                            <div className="col-6">
                                <bs.FinalField name="firstName" type="text" label="First Name" labelSize={4} labelClassName="form-required" />
                                <bs.FinalField name="age" type="number" label="Age" labelSize={4} labelClassName="form-required" />
                                <bs.FinalField name="lastName" type="text" label="Last Name" labelSize={4} />
                                <bs.FinalField name="birthDate" type="text" label="Birth Date" labelSize={4} />
                                <bs.FinalField name="email" type="email" label="Email" labelSize={4} labelClassName="form-required" />
                                <bs.FinalField name="website" type="text" label="Website" labelSize={4} labelClassName="form-required" />
                                <bs.FinalField name="address.city" type="text" label="city" labelSize={4} labelClassName="form-required" />
                                <bs.FinalCheck name="employed" type="checkbox" label="Employed" labelSize={4} labelClassName="form-required" />
                                <bs.FinalSelect name="favoriteColor" placeholder="choose..." label="Favorite Color" labelSize={4} values={FavoriteColors} labelClassName="form-required" />
                                <bs.FinalSelect name="toppings" label="Toppings" labelSize={4} values={Toppings} multiple placeholder="your choose?" />
                                <bs.FinalCheck name="sauces" label="Sauces: " labelSize={4} values={Sauces} inline />
                                <bs.FinalRadio name="stooges" label="Best Stooges" labelSize={4} values={Stooges} inline />
                                <bs.FinalTextArea name="notes" label="Notes" labelSize={4} placeholder="Notes" rows={5} labelClassName="text-primary" />
                                <hr />
                                <b>Form Arguments</b>
                                <pre>{JSON.stringify({ handleSubmit, form, submitting, pristine, ...args }, 0, 2)}</pre>
                            </div>


                            <div className="col-6 bg-secondary text-dark">
                                <div>
                                    <label>First Name</label>
                                    <Field name="firstName" component="input" type="text" placeholder="First Name" />
                                </div>
                                <div>
                                    <label>Last Name</label>
                                    <Field name="lastName" component="input" type="text" placeholder="Last Name" />
                                </div>
                                <div>
                                    <label>Employed</label>
                                    <Field name="employed" component="input" type="checkbox" />
                                </div>
                                <div>
                                    <label>Favorite Color</label>
                                    <Field name="favoriteColor" component="select">
                                        <option />
                                        <option value="#ff0000">❤️ Red</option>
                                        <option value="#00ff00">💚 Green</option>
                                        <option value="#0000ff">💙 Blue</option>
                                    </Field>
                                </div>
                                <div>
                                    <label>Toppings</label>
                                    <Field name="toppings" component="select" multiple>
                                        <option value="chicken">🐓 Chicken</option>
                                        <option value="ham">🐷 Ham</option>
                                        <option value="mushrooms">🍄 Mushrooms</option>
                                        <option value="cheese">🧀 Cheese</option>
                                        <option value="tuna">🐟 Tuna</option>
                                        <option value="pineapple">🍍 Pineapple</option>
                                    </Field>
                                </div>
                                <div>
                                    <label>Sauces</label>
                                    <div>
                                        <label><Field name="sauces" component="input" type="checkbox" value="ketchup" />{' '} Ketchup</label>
                                        <label><Field name="sauces" component="input" type="checkbox" value="mustard" />{' '} Mustard</label>
                                        <label><Field name="sauces" component="input" type="checkbox" value="mayonnaise" />{' '} Mayonnaise</label>
                                        <label><Field name="sauces" component="input" type="checkbox" value="guacamole" />{' '} Guacamole 🥑</label>
                                    </div>
                                </div>
                                <div>
                                    <label>Best Stooge</label>
                                    <div>
                                        <label><Field name="stooge" component="input" type="radio" value="larry" />Larry</label>
                                        <label><Field name="stooge" component="input" type="radio" value="moe" />{' '} Moe </label>
                                        <label><Field name="stooge" component="input" type="radio" value="curly" />{' '} Curly </label>
                                    </div>
                                </div>
                                <div>
                                    <label>Notes</label>
                                    <Field name="notes" component="textarea" placeholder="Notes" />
                                </div>
                                <div className="buttons">
                                    <button type="submit" disabled={submitting || pristine}>Submit</button>
                                    <button type="button" onClick={form.reset} disabled={submitting || pristine}>Reset</button>
                                </div>
                                <hr />
                                <b>Values:</b>
                                <pre className="text-dark">{JSON.stringify(values, 0, 2)}</pre>
                            </div>
                        </div>
                    </form>
                )}
            />
        </>
    );
}

