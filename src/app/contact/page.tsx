import { AddressIcon, EmailIcon, PhoneIcon } from "@/components/icons";

const Page = () => {
  return (
    <>
      <h1 className="bg-[#F7F7F9] font-semibold text-[#333333] text-[44px] py-16 text-center">
        Contact Us
      </h1>
      <section className="py-10 w-[90%] md:w-auto mx-auto">
        <h2 className="font-medium text-center text-3xl text-[#333333] pb-5">
          {"Have a question? We're here to help"}
        </h2>
        <p className="text-lg text-[#3c3c3c] text-center pb-2">
          You can call us from Monday to Friday between 9 AM and 5 PM.
        </p>
        <div className="mx-auto max-w-[1170px] md:w-[720px] lg:w-[960px] xl:w-[1170px] ">
          <div className="mt-10 grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-[#F7F7F9] py-10 px-6 rounded-lg border-l-2 border-[#f36e23]">
              <h4 className="font-medium text-[18px] pb-4">Contact Number</h4>
              <p className="flex items-center gap-3">
                <PhoneIcon />
                <span>+91 99999999999</span>
              </p>
            </div>
            <div className="bg-[#F7F7F9] py-10 px-6 rounded-lg border-l-2 border-[#f36e23]">
              <h4 className="font-medium text-[18px] pb-4">Email</h4>
              <p className="flex items-center gap-3">
                <EmailIcon />
                <span>info@trendynextshop.com</span>
              </p>
            </div>
            <div className="bg-[#F7F7F9] py-10 px-6 rounded-lg border-l-2 border-[#f36e23]">
              <h4 className="font-medium text-[18px] pb-4">Address</h4>
              <p className="flex items-center gap-3">
                <AddressIcon />
                <span>New Delhi, India, 123456</span>
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Contact */}
    </>
  );
};

export default Page;
