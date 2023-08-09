import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../Context/AuthProvider";
import axios from "axios";

const CompanyProfile = () => {
  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [company, setCompany] = useState(false);
  const [technologies, setTechnologies] = useState([]);

  // https://elegant-bd-jobs.onrender.com/get-company-details/

  useEffect(() => {
    setIsLoading(true);
    try {
      const fetchCompanyData = async () => {
        const companyInfo = await axios.get(`https://elegant-bd-jobs.onrender.com/get-company-details/${user.uid}`);
        console.log(companyInfo.data.technologies);
        setTechnologies(companyInfo.data.technologies);
        setCompany(companyInfo.data);
      };

      fetchCompanyData();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, []);
  return (
    <div>
      {isLoading ? (
        <></>
      ) : (
        <div className="flex justify-between">
          <div>
            <p className="text-3xl font-extrabold text-primary mb-5">
              {company?.companyName}
            </p>
            <p>Email: {company?.email}</p>
            <p>Phone: {company?.phone}</p>
            <p>Locations: {company?.locations}</p>
            <p>Industry: {company?.industry}</p>
            <p>Description: {company?.description}</p>
            <p>
              Website:{" "}
              {company?.website || (
                <span className="text-red-500">no link found</span>
              )}
            </p>
            <p>
              Facebook:{" "}
              {company?.facebook || (
                <span className="text-red-500">no link found</span>
              )}
            </p>
            <p>
              Twitter:{" "}
              {company?.twitter || (
                <span className="text-red-500">no link found</span>
              )}
            </p>
            <p>
              Linkedin:{" "}
              {company?.linkedin || (
                <span className="text-red-500">no link found</span>
              )}
            </p>
            <p>
              Tecnologies:
              {technologies.map((technology, index) => (
                <span className="badge-ghost mx-1 px-2" key={index}>
                  {technology}
                </span>
              ))}
            </p>
          </div>

          <div>
            <div className="avatar">
              <div className="w-64 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src={company?.photoURL || company.companyLogo}/>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyProfile;
