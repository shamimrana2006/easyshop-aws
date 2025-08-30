import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Loading from "../../../Layout/Loading";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { CheckOTPThunk, veridicationOTPsender } from "../../../features/verification";

const Profile = () => {
  const navigate = useNavigate();
  const userState = useSelector((state) => state.userStore);
  const dispatch = useDispatch();

  if (userState.loading) {
    return <Loading />;
  }

  const { name, UserName, email } = userState?.user?.payLoad || {};
  const isVarified = userState?.user?.payLoad?.isVerified?.value;

  // ✅ email otp sending + verifying
  const ActivationOTP = async () => {
    Swal.fire({
      title: "Enter your email",
      input: "email",
      inputValue: `${email}`, // default email দেখাবে
      inputPlaceholder: "Enter your email address",
      showCancelButton: true,
      confirmButtonText: "Submit",
    }).then(async (result) => {
      if (result.isConfirmed && result.value) {
        const email = result?.value;

        try {
          // OTP send করার promise
          const otpPromise = dispatch(
            veridicationOTPsender({ email, UserName })
          ).unwrap();

          await toast.promise(otpPromise, {
            pending: "Sending OTP...",
            success: "OTP sent successfully!",
            error: {
              render({ data }) {
                return data?.message || "Something went wrong while sending OTP";
              },
            },
          });

          // ✅ OTP verification popup
          Swal.fire({
            title: "Enter OTP",
            input: "text",
            inputPlaceholder: "Enter the OTP sent to your email",
            showCancelButton: true,
            confirmButtonText: "Verify",
            preConfirm: async (otp) => {
              try {
                if (!otp) {
                  Swal.showValidationMessage("Please enter OTP");
                  return false;
                }

                // verify otp API
                const otpCheckPromise = dispatch(
                  CheckOTPThunk({ email, otp, UserName })
                ).unwrap();

                await toast.promise(otpCheckPromise, {
                  pending: "Checking...",
                  success: "Account verified successfully!",
                  error: {
                    render({ data }) {
                      return data?.message || "Invalid OTP, please try again!";
                    },
                  },
                });

                return true; // ✅ success হলে popup বন্ধ হবে
              } catch (error) {
                Swal.showValidationMessage(
                  error?.message || "Invalid OTP, please try again!"
                );
                return false; // ❌ error হলে popup open থাকবে
              }
            },
          }).then((otpResult) => {
            if (otpResult.isConfirmed) {
              Swal.fire({
                icon: "success",
                title: "Verified!",
                text: "Your email has been successfully verified.",
              });
            }
          });
        } catch (error) {
          console.error("OTP sending failed:", error);
        }
      }
    });
  };

  return (
    <div>
      <div className="flex items-center gap-4 flex-col justify-center">
        <div
          className={`rounded-full overflow-hidden p-1 w-24 h-24 flex items-center justify-center ${
            isVarified ? "border-green-500" : "border-yellow-300"
          } border-2 `}
        >
          <img
            className="rounded-full w-full h-full"
            src={
              "httpinstagram-profile-picture-for-girls-aesthetic_28.webp"
            }
            alt=""
          />
        </div>
        <span>Welcome ,{name}</span>
        {isVarified ? (
          <span className="">
            Congratulations! Your account is now{" "}
            <span className="text-success">varified</span>
          </span>
        ) : (
          <span className="text-center">
            Your account successfully created but not verifyed please send with
            email verification and{" "}
            <span
              onClick={ActivationOTP}
              className="text-primary underline hover:no-underline cursor-pointer"
            >
              Activate now
            </span>
          </span>
        )}

        <div className="grid max-w-[840px]  gap-6 grid-cols-1 md:grid-cols-2">
          <div className="border grid border-border rounded p-3">
            <div className="grid grid-cols-12">
              <div className="col-span-12">
                <h1 className="text-2xl mb-6">Your Privacy Control</h1>
                <div className="pb-4">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Repellat, ipsam! Inventore commodi reprehenderit vel. Alias
                  impedit consectetur nisi a in! In, ullam magnam sit ea?
                </div>
              </div>
              <div></div>
            </div>
            <div className="border-t border-border cursor-pointer text-primary p-3">
              Manage your data & privacy
            </div>
          </div>
          <div className="border grid border-border rounded p-3">
            <div className="grid grid-cols-12">
              <div className="col-span-12">
                <h1 className="text-2xl  mb-6">Your Account is protected</h1>
                <div className="pb-4">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Repellat, ipsam! Inventore commodi reprehenderit vel. Alias
                  impedit consectetur nisi a in! In, ullam magnam sit ea?
                </div>
              </div>
              <div></div>
            </div>
            <div className="border-t border-border cursor-pointer text-primary p-3">
              Manage your data & privacy
            </div>
          </div>
          <div className="border grid border-border md:col-span-2 col-span-1 rounded p-3">
            <div className="grid grid-cols-12">
              <div className="col-span-12">
                <h1 className="text-2xl mb-6">Your Privacy Control</h1>
                <div className="pb-4">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Repellat, ipsam! Inventore commodi reprehenderit vel. Alias
                  impedit consectetur nisi a in! In, ullam magnam sit ea?
                </div>
              </div>
              <div></div>
            </div>
            <div className="border-t border-border cursor-pointer text-primary p-3">
              Manage your data & privacy
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
