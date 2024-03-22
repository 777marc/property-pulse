import InfoBox from "./InfoBox";

const InfoBoxes = () => {
  return (
    <section>
      <div className="container-xl lg:container m-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
          <InfoBox
            heading={"For Renters"}
            buttonInfo={{
              link: "/",
              text: "Browse Properties",
              backgroundColor: "bg-gray-800",
              textColor: "text-gray-100",
            }}
          >
            Find your dream rental property. Bookmark properties and contact
            owners.
          </InfoBox>

          <InfoBox
            heading={"For Property Owners"}
            backgroundColor="bg-blue-100"
            textColor="text-blue-800"
            buttonInfo={{
              link: "/",
              text: "Add Property",
              backgroundColor: "bg-blue-800",
              textColor: "text-gray-100",
            }}
          >
            List your properties and reach potential tenants. Rent as an airbnb
            or long term.
          </InfoBox>
        </div>
      </div>
    </section>
  );
};

export default InfoBoxes;
