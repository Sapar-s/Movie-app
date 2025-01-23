import { Mail, Phone } from "lucide-react";

export const Footer = () => {
  return (
    <div className="w-[100vw] bg-[#4338CA] mt-[51px]">
      <div className="max-w-[1280px] h-[280px] m-auto flex justify-between p-10 ">
        <div>
          <div className="flex gap-2 ">
            <img src="/filmLogoW.svg" alt="" />
            <h3 className="text-[#fafafa] text-base font-[700] ">Movie Z</h3>
          </div>
          <p className="text-[14px] font-[400] leading-[20px] text-[#fafafa] ">
            © 2024 Movie Z. All Rights Reserved.
          </p>
        </div>
        <div className="flex">
          <div>
            <h4 className="text-[14px] text-[#fafafa]">Contact Information</h4>
            <div className="flex items-center gap-3 mt-3">
              <Mail className="text-[#fafafa] w-4 h-4" />
              <div>
                <h4 className="text-[14px] text-[#fafafa]">Email:</h4>
                <h5 className="text-[14px] text-[#fafafa]">
                  support@movieZ.com
                </h5>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-6">
              <Phone className="text-[#fafafa] w-4 h-4" />
              <div>
                <h4 className="text-[14px] text-[#fafafa]">Phone:</h4>
                <h5 className="text-[14px] text-[#fafafa]">
                  +976 (11) 123-4567
                </h5>
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-[14px] text-[#fafafa]">Follow us</h4>
            <div className="flex mt-3">
              <h5 className="text-14px font-[500] leading-[20px] text-[#fafafa]">
                Facebook
              </h5>
              <h5 className="text-14px font-[500] leading-[20px] text-[#fafafa]">
                Instagram
              </h5>
              <h5 className="text-14px font-[500] leading-[20px] text-[#fafafa]">
                Twitter
              </h5>
              <h5 className="text-14px font-[500] leading-[20px] text-[#fafafa]">
                YouTube
              </h5>
            </div>
          </div>
        </div>
      </div>{" "}
    </div>
  );
};
