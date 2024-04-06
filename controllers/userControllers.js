const users = require("../models/userSchema");
const userotp = require("../models/userOtp");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        // pass: process.env.PASSWORD
    }
})

exports.userregister = async (req, res) => {
    const { email, phoneNo, userName } = req.body;

    if (!email || !phoneNo || !userName) {
        return res.status(400).json({ error: "Please enter all input data" });
    }

    try {
        const presuer = await users.findOne({ email: email });

        if (presuer) {
            return res.status(400).json({ error: "This user already exists in our db" });
        } else {
            const userregister = new users({ email, phoneNo, userName });
            const storeData = await userregister.save();
            return res.status(200).json(storeData);
        }
    } catch (error) {
        return res.status(400).json({ error: "Invalid Details", error });
    }
}

exports.userOtpSend = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ error: "Please enter your email" });
    }

    try {
        const presuer = await users.findOne({ email: email });

        if (!presuer) {
            return res.status(400).json({ error: "This user does not exist in our db" });
        }

        const OTP = Math.floor(100000 + Math.random() * 900000);

        const existEmail = await userotp.findOne({ email: email });

        if (existEmail) {
            const updateData = await userotp.findByIdAndUpdate({ _id: existEmail._id }, { otp: OTP }, { new: true });

            const mailOptions = {
                from: process.env.EMAIL,
                to: email,
                subject: "Sending Email For Otp Validation",
                text: OTP
            }

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log("error", error);
                    return res.status(400).json({ error: "email not sent" });
                } else {
                    console.log("Email sent", info.response);
                    return res.status(200).json({ message: "Email sent successfully" });
                }
            });
        } else {
            const saveOtpData = new userotp({ email, otp: OTP });
            await saveOtpData.save();

            const mailOptions = {
                from: process.env.EMAIL,
                to: email,
                subject: "Sending Email For Otp Validation",
                text:  OTP
            }

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log("error", error);
                    return res.status(400).json({ error: "email not sent" });
                } else {
                    console.log("Email sent", info.response);
                    return res.status(200).json({ message: "Email sent successfully" });
                }
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "An error occurred" });
    }
}