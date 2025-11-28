import { useState } from 'react';
import Posts from '../posts/posts';
import './Blog.css';

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'React', '.NET', 'Design', 'Automation', 'JavaScript', 'TypeScript', 'MongoDB', 'General'];

  return (
    <section className="blogPage">
      <div className="blogPageHeader">
        <div className="blogPageIntro">
          <h1 className="blogPageTitle">Blog</h1>
          <p className="blogPageDescription">
            This is where I collect long-form technical articles, study notes, and observations from experimental projects.
            Expect fresh content on the React ecosystem, the .NET world, automation tools, UX research, and sustainable productivity habits.
          </p>
          <p className="blogPageSubDescription">
            Each article is written with the goal of sharing practical knowledge and real-world experiences. 
            Whether you're looking to learn new technologies, improve your development workflow, or explore design methodologies, 
            you'll find valuable insights here.
          </p>
        </div>

        <div className="blogPageCategories">
          <h2 className="blogPageCategoriesTitle">Categories</h2>
          <div className="blogPageCategoryFilters">
            {categories.map((category) => (
              <button
                key={category}
                className={`blogPageCategoryButton ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="blogPageContent">
        <Posts selectedCategory={selectedCategory} />
      </div>

      <div className="blogPageFooter">
        <div className="blogPageFooterContent">
          <h3>Want to contribute?</h3>
          <p>
            Have a topic you'd like me to cover? Or interested in contributing a guest post? 
            Feel free to reach out through the contact page. I'm always open to suggestions and collaborations.
          </p>
        </div>
      </div>
    </section>
  );
}

