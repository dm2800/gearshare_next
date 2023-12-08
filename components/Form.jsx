import React from "react";
import Link from "next/link";

const Form = ({ type, item, setItem, submitting, handleSubmit }) => {
    return (
        <section className="w-full max-w-full flex-start text-left flex-col">
            <h1 className="head_text orange_gradient font-inter">
                <span>{type} Your Gear</span>
            </h1>
            {/* <p className="desc text-left max-w-md">
                {type} 
            </p> */}

            <form
                onSubmit={handleSubmit}
                className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
            >
                <label>
                    <span className="font-satoshi font-semibold text-base text-gray-700">
                        Name
                    </span>

                    <textarea
                        value={item.title}
                        onChange={(e) =>
                            setItem({ ...item, title: e.target.value })
                        }
                        placeholder="i.e. Gibson SG"
                        required
                        className="form_textarea"
                    ></textarea>
                </label>
                <label>
                    <span className="font-satoshi font-semibold text-base text-gray-700">
                        Price <span className="text-sm font-normal text-gray-500">(per day)</span>
                    </span>

                    <textarea
                        value={item.price}
                        onChange={(e) =>
                            setItem({ ...item, price: e.target.value })
                        }
                        placeholder="i.e. $50"
                        required
                        className="form_textarea"
                    ></textarea>
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

                    <textarea
                        value={item.image}
                        onChange={(e) =>
                            setItem({ ...item, image: e.target.value })
                        }
                        placeholder="i.e. copy image address"
                        required
                        className="form_textarea"
                    ></textarea>
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
