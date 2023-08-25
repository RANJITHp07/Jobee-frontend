import React,{useState,useEffect,ChangeEvent} from 'react';
import CancelIcon from '@mui/icons-material/Cancel';

interface ProfileBodyProps {
  page: boolean;
  profileSummary?: string;
  skills?: string[] | string;
  experience?: string;
  language?: string[] | string;
  achievements?: string;
  education?:string
  updateProfile?:any,
  setUpdateProfile?: React.Dispatch<React.SetStateAction<any>>
}

function ProfileBody({ page, profileSummary, skills, experience, language, achievements,education,updateProfile,setUpdateProfile }: ProfileBodyProps) {
   const [skill, setSkills] = useState<string[]>([]);
   const [languages,setlanguages]=useState<string[]>([]);
   const [languageInput, setlanguageInput] = useState('');
   const [skillInput, setSkillInput] = useState('');

   const handleAddSkill = () => {
    if (skillInput.trim() !== '') {
      setSkills((prevSkills) => {
        const newSkills = [...prevSkills, skillInput];
        if (setUpdateProfile && updateProfile) {
          setUpdateProfile((prevProfile:any) => ({
            ...prevProfile,
            skills: newSkills,
          }));
        }
        return newSkills;
      });
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (index: number) => {
    setSkills((prevSkills) => {
      const newSkills = prevSkills.filter((_, i) => i !== index);
      if (setUpdateProfile && updateProfile) {
        setUpdateProfile((prevProfile:any) => ({
          ...prevProfile,
          skills: newSkills,
        }));
      }
      return newSkills;
    });
  };

  const handleAddLanguage = () => {
    if (languageInput.trim() !== '') {
      setlanguages((prevLanguages) => {
        const newLanguages = [...prevLanguages, languageInput];
        if (setUpdateProfile && updateProfile) {
          setUpdateProfile((prevProfile:any) => ({
            ...prevProfile,
            language: newLanguages,
          }));
        }
        return newLanguages;
      });
      setlanguageInput('');
    }
  };
  

  const handleRemoveLanguage = (index: number) => {
    setlanguages((prevLanguages) => {
      const newLanguages = prevLanguages.filter((_, i) => i !== index);
      if (setUpdateProfile && updateProfile) {
        setUpdateProfile((prevProfile:any) => ({
          ...prevProfile,
          language: newLanguages,
        }));
      }
      return newLanguages;
    });
  };
  

  useEffect(()=>{
    if (Array.isArray(skills)) {
  
      if(skills.length>0 && skills[0]!=''){
        setSkills(skills);
      }
    }

    if (Array.isArray(language)) {
      
      if(language.length>0 && language[0]!=''){
        setlanguages(language);
      }
    }
    
  },[])

  return (
    <div className="m-5 box_shadow p-5 rounded-lg">
      <div>
        <p className="text-sm font-bold text-slate-500">PROFILE SUMMARY</p>
        {page ? (
          <p className="my-3 p-2 bg-slate-100 rounded-xl border-2 border-slate-200 text-slate-600">{profileSummary || 'Not mentioned'}</p>
        ) : (
          <textarea
            id="w3review"
            name="w3review"
            rows={5}
            cols={30}
            className="my-3 border-2 border-slate-600 rounded-lg overflow-scroll p-2 bg-slate-100 md:w-full md:overflow-x-hidden"
            defaultValue={profileSummary==='Not at mentioned'?'': profileSummary}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
              if (setUpdateProfile && updateProfile) {
                setUpdateProfile({ ...updateProfile, profileSummary: e.target.value });
              }
            }}
          ></textarea>
        )}
      </div>

      <div>
        <p className="text-sm font-bold text-slate-500">SKILLS</p>
        {page ? (
          <div className="flex my-3">
            {Array.isArray(skills) && skills.length!=0 ?
              skills.map((skill: string, index: number) => (
                <div
                  key={index}
                  className="my-3 bg-slate-300 bg-opacity-30 border mx-1 border-slate-200 text-slate-600 rounded-xl mt-3 px-2 inline-block backdrop-filter backdrop-blur-lg"
                >
                  {skill}
                </div>
              )): <p className="my-3 p-2 bg-slate-100 rounded-xl border-2 border-slate-200 text-slate-500">'Not mentioned</p>
            }
          </div>
        ) : (
         <>
         
        <div className="flex">
          <input
            id="username"
            type="text"
            className="mt-1 mb-2 border-2 border-slate-700 rounded-lg overflow-scroll p-2 bg-slate-100 md:w-full md:overflow-x-hidden"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
          />
          <button
            className="bg-indigo-950 ml-2 px-2 text-white rounded-lg"
            onClick={()=>{
              handleAddSkill()
             
            }}
          >
            Add
          </button>
        </div>

        {skill.map((skills, index) => (
          <div
            key={index}
            className="bg-slate-300 bg-opacity-30 border mx-1 border-slate-200 rounded-xl mb-5 pl-2 inline-block backdrop-filter backdrop-blur-lg"
          >
            {skills}
            <CancelIcon
              onClick={() => handleRemoveSkill(index)}
              className="cursor-pointer ml-2 text-gray-600 hover:text-red-100"
            />
          </div>
        ))}
         </>
        )}
      </div>

      <div>
        <p className="text-sm font-bold text-slate-500">WORK EXPERIENCE</p>
        {page ? (
          <p className="my-3 p-2 bg-slate-100 rounded-xl border-2 border-slate-200 text-slate-500">{experience || 'Not mentioned'}</p>
        ) : (
          <textarea
            id="w3review"
            name="w3review"
            rows={5}
            cols={30}
            className="my-3 border-2 border-slate-600 rounded-lg overflow-scroll p-2 bg-slate-100 md:w-full md:overflow-x-hidden"
            defaultValue={experience==='Not at mentioned'?'':experience}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
              if (setUpdateProfile && updateProfile) {
                setUpdateProfile({ ...updateProfile, 
                  experience: e.target.value });
              }
            }}
          ></textarea>
        )}
      </div>

      <div>
        <p className="text-sm font-bold text-slate-500">EDUCATION</p>
        {page ? (
          <p className="my-3 p-2 bg-slate-100 rounded-xl border-2 border-slate-200 text-slate-500">{education || 'Not mentioned'}</p>
        ) : (
          <textarea
            id="w3review"
            name="w3review"
            rows={5}
            cols={30}
            className="my-3 border-2 border-slate-700 rounded-lg overflow-scroll p-2 bg-slate-100 md:w-full md:overflow-x-hidden"
            defaultValue={education==='Not at mentioned'?'':education}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
              if (setUpdateProfile && updateProfile) {
                setUpdateProfile({ ...updateProfile, 
                  education: e.target.value });
              }
            }}
          ></textarea>
        )}
      </div>

      <div>
        <p className="text-sm font-bold text-slate-500">LANGUAGE</p>
        {page ? (
          <div className="flex my-3">
            {Array.isArray(languages) && languages.length!=0 ?
              languages.map((languages: string, index: number) => (
                <div
                  key={index}
                  className="my-3 bg-slate-300 bg-opacity-30 border mx-1 border-slate-200 text-slate-600 rounded-xl mt-3 px-2 inline-block backdrop-filter backdrop-blur-lg"
                >
                  {languages}
                </div>
              )): <p className="my-3 p-2 bg-slate-100 rounded-xl border-2 border-slate-200 text-slate-500">'Not mentioned</p>
            }
          </div>
        ) : (
         <>
         
        <div className="flex">
          <input
            id="username"
            type="text"
            className="mt-1 mb-2 border-2 border-slate-700 rounded-lg overflow-scroll p-2 bg-slate-100 md:w-full md:overflow-x-hidden"
            value={languageInput}
            onChange={(e) => setlanguageInput(e.target.value)}
          />
          <button
            className="bg-indigo-950 ml-2 px-2 text-white rounded-lg"
            onClick={handleAddLanguage}
          >
            Add
          </button>
        </div>

        {languages.map((languages, index) => (
          <div
            key={index}
            className="bg-slate-300 bg-opacity-30 border mx-1 border-slate-200 rounded-xl mb-5 pl-2 inline-block backdrop-filter backdrop-blur-lg"
          >
            {languages}
            <CancelIcon
              onClick={() => handleRemoveLanguage(index)}
              className="cursor-pointer ml-2 text-gray-600 hover:text-red-100"
            />
          </div>
        ))}
         </>
        )}
      </div>
      <div>
        <p className="text-sm font-bold text-slate-500 flex items-center">ACHIEVEMENTS</p>
        {page ? (
          <p className="my-3 p-2 bg-slate-100 rounded-xl border-2 border-slate-200 text-slate-500">{achievements || 'Not mentioned'}</p>
        ) : (
          <div className="flex my-3">
            <textarea
              id="w3review"
              name="w3review"
              rows={1}
              cols={30}
              className="border-2 border-slate-700 rounded-lg p-2 bg-slate-100 w-10/12 md:w-11/12"
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                if (setUpdateProfile && updateProfile) {
                  setUpdateProfile({ ...updateProfile, 
                    achievements: e.target.value });
                }
              }}
            ></textarea>
           
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfileBody;
