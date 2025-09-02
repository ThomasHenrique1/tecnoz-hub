import Link from "next/link"

export default function CategoryGrid({ categories }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
      {categories.map((category, index) => (
        <Link
          key={index}
          href={`/produtos?categoria=${encodeURIComponent(category.name)}`}
          className="group card bg-base-100 border border-base-300 hover:border-primary hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
        >
          <div className="card-body p-4 text-center">
            <div className="flex justify-center mb-3">
              <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
                <category.icon className="h-8 w-8 text-primary" />
              </div>
            </div>
            
            <h3 className="font-semibold text-base-content group-hover:text-primary transition-colors">
              {category.name}
            </h3>
            
            <p className="text-sm text-base-content/60">
              {category.count}
            </p>
          </div>
        </Link>
      ))}
    </div>
  )
}