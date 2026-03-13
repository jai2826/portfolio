import Image from "next/image";

const FeaturedProject = () => {
  return (
    <div className="w-full h-auto rounded-lg overflow-hidden">
      <div className="w-full text-xl p-4 bg-background text-primary-foreground font-semibold ">
        Featured Project
      </div>
      <Image
        src="/PreviewImage.jpg"
        width={800}
        height={500}
        alt="Project preview"
      />
    </div>
  );
};

export default FeaturedProject;
