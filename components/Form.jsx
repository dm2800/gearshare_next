import React from "react";
import Link from "next/link";

const Form = ({ type, item, setItem, submitting, handleSubmit }) => {
    return (
        <section className="w-full max-w-full flex-start text-left flex-col">
            <h1 className="head_text orange_gradient font-inter self-center">
                <span>{type} Your Gear</span>
            </h1>
            {/* <p className="desc text-left max-w-md">
                {type} 
            </p> */}

            <form
                onSubmit={handleSubmit}
                className="mt-10 md:w-[700px] sm:w-[500px] max-w-xl flex flex-col gap-7 glassmorphism"
            >
                <label>
                    <span className="font-satoshi font-semibold text-base text-gray-700">
                        Name
                    </span>

                    <input
                        value={item.title}
                        onChange={(e) =>
                            setItem({ ...item, title: e.target.value })
                        }
                        placeholder="i.e. Gibson SG"
                        required
                        className="form_input"
                    ></input>
                </label>
                <label>
                    <span className="font-satoshi font-semibold text-base text-gray-700">
                        Price <span className="text-sm font-normal text-gray-500">(per day)</span>
                    </span>
                    <input
                        value={item.price}
                        onChange={(e) =>
                            setItem({ ...item, price: e.target.value })
                        }
                        placeholder="i.e. $50"
                        required
                        className="form_input"
                    ></input>

                </label>

                <label>
                    <span className="font-satoshi font-semibold text-base text-gray-700">
                        Description
                    </span>

                    <textarea
                        value={item.description}
                        onChange={(e) =>
                            setItem({ ...item, description: e.target.value })
                        }
                        placeholder="i.e. why do you love it, what makes it special?"
                        required
                        className="form_textarea"
                    ></textarea>
                </label>
                <label>
                    <span className="font-satoshi font-semibold text-base text-gray-700">
                        Image
                    </span>

                    <input
                        value={item.image}
                        onChange={(e) =>
                            setItem({ ...item, image: e.target.value })
                        }
                        placeholder="i.e. copy image address"
                        required
                        className="form_input"
                    ></input>
                </label>
                <label>
                    <span className="font-satoshi font-semibold text-base text-gray-700">
                        Street Address
                    </span>

                    <input
                        value={item.address?.streetAddress}
                        onChange={(e) =>
                            setItem({...item, address: {...item.address, streetAddress: e.target.value} })
                        }
                        placeholder="1234 Spring St"
                        required
                        className="form_input"
                    ></input>
                </label>
                <label>
                    <span className="font-satoshi font-semibold text-base text-gray-700">
                        City
                    </span>

                    <input
                        value={item.address?.city}
                        onChange={(e) =>
                            setItem({...item, address: {...item.address, city: e.target.value} })
                        }
                        placeholder="Los Angeles"
                        required
                        className="form_input"
                    ></input>
                </label>
                <label>
                    <span className="font-satoshi font-semibold text-base text-gray-700">
                        State
                    </span>
                    <br></br>

{/* //Using picklist for state rather than input  */}
<select value={item.address?.state}
onChange={(e) => setItem({...item, address: {...item.address, state: e.target.value} })}>
	<option value="AL">Alabama</option>
	<option value="AK">Alaska</option>
	<option value="AZ">Arizona</option>
	<option value="AR">Arkansas</option>
	<option value="CA">California</option>
	<option value="CO">Colorado</option>
	<option value="CT">Connecticut</option>
	<option value="DE">Delaware</option>
	<option value="DC">District Of Columbia</option>
	<option value="FL">Florida</option>
	<option value="GA">Georgia</option>
	<option value="HI">Hawaii</option>
	<option value="ID">Idaho</option>
	<option value="IL">Illinois</option>
	<option value="IN">Indiana</option>
	<option value="IA">Iowa</option>
	<option value="KS">Kansas</option>
	<option value="KY">Kentucky</option>
	<option value="LA">Louisiana</option>
	<option value="ME">Maine</option>
	<option value="MD">Maryland</option>
	<option value="MA">Massachusetts</option>
	<option value="MI">Michigan</option>
	<option value="MN">Minnesota</option>
	<option value="MS">Mississippi</option>
	<option value="MO">Missouri</option>
	<option value="MT">Montana</option>
	<option value="NE">Nebraska</option>
	<option value="NV">Nevada</option>
	<option value="NH">New Hampshire</option>
	<option value="NJ">New Jersey</option>
	<option value="NM">New Mexico</option>
	<option value="NY">New York</option>
	<option value="NC">North Carolina</option>
	<option value="ND">North Dakota</option>
	<option value="OH">Ohio</option>
	<option value="OK">Oklahoma</option>
	<option value="OR">Oregon</option>
	<option value="PA">Pennsylvania</option>
	<option value="RI">Rhode Island</option>
	<option value="SC">South Carolina</option>
	<option value="SD">South Dakota</option>
	<option value="TN">Tennessee</option>
	<option value="TX">Texas</option>
	<option value="UT">Utah</option>
	<option value="VT">Vermont</option>
	<option value="VA">Virginia</option>
	<option value="WA">Washington</option>
	<option value="WV">West Virginia</option>
	<option value="WI">Wisconsin</option>
	<option value="WY">Wyoming</option>
</select>
                </label>


                <label>
                    <span className="font-satoshi font-semibold text-base text-gray-700">
                        Postal Code
                    </span>

                    <input
                        value={item.address?.postalCode}
                        onChange={(e) =>
                            setItem({...item, address: {...item.address, postalCode: e.target.value} })
                        }
                        placeholder="90210"
                        required
                        className="form_input"
                    ></input>
                </label>


                <div className="flex-end mx-3 mb-5 gap-4">
                        <Link href = "/"
                        className="text-gray-500 text-sm">Cancel</Link>
                        <button type="submit"
                        disabled={submitting}
                        className = "px-5 py-1.5 text-sm bg-cyan-700 rounded-full text-white">{submitting ? `${type}...` : type}</button>
                </div>
            </form>
        </section>
    );
};

export default Form;
