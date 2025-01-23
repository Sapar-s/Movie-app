import { Mail, Phone } from "lucide-react";

export const Footer = () => {
  return (
    <div className="max-w-[1440px] ">
      <div>
        <div className="flex gap-2 ">
          <img src="/filmLogo.svg" alt="" />
          <h3 className="text-[#4338CA] text-base font-[700] ">Movie Z</h3>
        </div>
        <p className="text-[14px] font-[400] leading-[20px] ">
          © 2024 Movie Z. All Rights Reserved.
        </p>
      </div>
      <div>
        <div>
          <h4 className="text-[14px]">Contact Information</h4>
          <div>
            <Mail />
            <div>
              <h4 className="text-[14px]">Email</h4>
              <h5 className="text-[14px]">support@movieZ.com</h5>
            </div>
          </div>

          <div>
            <Phone />
            <div>
              <h4 className="text-[14px]">Phone</h4>
              <h5 className="text-[14px]">+976 (11) 123-4567</h5>
            </div>
          </div>
        </div>
        <div>
          <h4 className="text-[14px]">Follow us</h4>
          <div className="flex">
            <h5 className="text-14px font-[500] leading-[20px] ">Facebook</h5>
            <h5 className="text-14px font-[500] leading-[20px] ">Instagram</h5>
            <h5 className="text-14px font-[500] leading-[20px] ">Twitter</h5>
            <h5 className="text-14px font-[500] leading-[20px] ">YouTube</h5>
          </div>
        </div>
      </div>
    </div>
  );
};
