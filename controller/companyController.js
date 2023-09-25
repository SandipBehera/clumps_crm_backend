const { db } = require("../database");
const {
  generateMD5Hash,
  generatePassword,
  GenerateUserID,
} = require("../hooks/generateMD5");

exports.Onboard = (req, res) => {
  const {
    companyName,
    companyEmail,
    comapnyPhone,
    companyAddress,
    companyPAN,
    companyGST,
    licenceStart,
    licenceEnd,
    companyType,
  } = req.body;

  const companyPassword = generateMD5Hash(generatePassword(companyName));
  const companyId = GenerateUserID(companyName);
  const query = `INSERT INTO public.clients(client_id, cient_name, client_email, client_phone, client_address, client_pan, client_gst, product_start, product_expire, company_password, company_type) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);`;

  const values = [
    companyId,
    companyName,
    companyEmail,
    comapnyPhone,
    companyAddress,
    companyPAN,
    companyGST,
    licenceStart,
    licenceEnd,
    companyPassword,
    companyType,
  ];
  const onboardComapny = db.query(query, values, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json("Company Onboared successfully");
    }
  });
  return onboardComapny;
};
exports.getCompanyType = (req, res) => {
  const getCompanyType = db.query(
    `SELECT * FROM public.company_type`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        const data = {
          status: "success",
          data: result.rows,
        };
        res.status(200).json(data);
      }
    }
  );
  return getCompanyType;
};
