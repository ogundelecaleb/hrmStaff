import React, { useEffect, useRef, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";

const Accessment = () => {

  const [accessmentPermissions, setLeavePermissions] = useState([
    {
      title: "Willingly takes up challenging tasks and accepts responsibilities",
      markFive: false,
      markFour: false,
      markThree: false,
      markTwo: false,
      markOne: false,
    },
    {
      title: "Works well in a team [including peers, supervisors or subordinnates]",
      markFive: false,
      markFour: false,
      markThree: false,
      markTwo: false,
      markOne: false,
    },
    {
      title: "Ensures proper organisation of work ",
      markFive: false,
      markFour: false,
      markThree: false,
      markTwo: false,
      markOne: false,
    },
    {
      title: "Effective/Efficient utilization of resources",
      markFive: false,
      markFour: false,
      markThree: false,
      markTwo: false,
      markOne: false,
    },
    {
      title: "Is punctual and time conscious in meetinng commitments",
      markFive: false,
      markFour: false,
      markThree: false,
      markTwo: false,
      markOne: false,
    },
    {
      title: "Dresses professionally to project the good image of the University",
      markFive: false,
      markFour: false,
      markThree: false,
      markTwo: false,
      markOne: false,
    },
  ]);

  const handlePermissionChange = (section, index, field) => {
    let updatedPermissions;

    switch (section) {
      
      case "accessment":
        updatedPermissions = [...accessmentPermissions];
        break;
      // Add cases for other sections as needed
      default:
        return;
    }

    updatedPermissions[index][field] = !updatedPermissions[index][field];

    // Update the state based on the section
    switch (section) {
      case "accessment":
        setLeavePermissions(updatedPermissions);
        break;
      default:
        return;
    }
  };

  return (
    <form>
      <div className="pb-3 mb-5 shadow  mt-5 mx-5">
        <p className=" mb-3 fs-4 fw-semibold ps-4 pt-3">ACCESSMENT</p>
        <div className="tb-res-parent px-3">
          <div className="tb-res">
            <table
              className="table table-bordered"
              style={{ fontSize: "17px" }}
            >
              <thead>
                <tr className="">
                  <th
                    scope="col"
                    className="text-center"
                    style={{ height: "55px" }}
                  >
                    S/N
                  </th>
                  <th scope="col" className="text-center">
                    CHARACTER/BEHAVIOURAL SKILLS
                  </th>
                  <th scope="col" className="text-center">
                    (5)
                  </th>
                  <th scope="col" className="text-center">
                    (4)
                  </th>
                  <th scope="col" className="text-center">
                    (3)
                  </th>
                  <th scope="col" className="text-center">
                    (2)
                  </th>
                  <th scope="col" className="text-center">
                    (1)
                  </th>
                </tr>
              </thead>
              <tbody className="">
                {accessmentPermissions.map((score, index) => (
                  <tr key={index}>
                    <td className="pt-4">{index + 1}</td>
                    <td className="pt-4">{score.title}</td>
                    <td className="pt-4 text-center">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        checked={score.markFive}
                        onChange={() =>
                          handlePermissionChange(
                            "accessment",
                            index,
                            "markFive"
                          )
                        }
                      />
                    </td>
                    <td className="pt-4 text-center">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        checked={score.markFour}
                        onChange={() =>
                          handlePermissionChange(
                            "accessment",
                            index,
                            "markFour"
                          )
                        }
                      />
                    </td>
                    <td className="pt-4 text-center">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        checked={score.markThree}
                        onChange={() =>
                          handlePermissionChange(
                            "accessment",
                            index,
                            "markThree"
                          )
                        }
                      />
                    </td>
                    <td className="pt-4 text-center">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        checked={score.markTwo}
                        onChange={() =>
                          handlePermissionChange("accessment", index, "markTwo")
                        }
                      />
                    </td>
                    <td className="pt-4 text-center">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        checked={score.markone}
                        onChange={() =>
                          handlePermissionChange(
                            "accessment",
                            index,
                            "markOne"
                          )
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Accessment;
