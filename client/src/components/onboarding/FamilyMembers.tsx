import React from "react";
import { useState, useEffect } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Card, CardContent } from "../../components/ui/card";
import { ArrowLeft, ArrowRight, Plus, X, Sprout, TreePine, Mountain, Crown } from "lucide-react";
import type { FamilyMember } from "../../../../shared/schema";

interface FamilyMembersProps {
  familyMembers: Omit<FamilyMember, 'id' | 'userId' | 'createdAt'>[];
  onFamilyMembersChange: (members: Omit<FamilyMember, 'id' | 'userId' | 'createdAt'>[]) => void;
  onNext: () => void;
  onBack: () => void;
}

interface NewFamilyMember {
  name: string;
  relationship: string;
  proficiency: string;
}

const RELATIONSHIPS = [
  { value: "parent", label: "Parent" },
  { value: "grandparent", label: "Grandparent" },
  { value: "sibling", label: "Sibling" },
  { value: "child", label: "Child" },
  { value: "spouse", label: "Spouse/Partner" },
  { value: "other", label: "Other" },
];

const PROFICIENCY_LEVELS = [
  { value: "beginner", label: "Beginner", icon: Sprout, color: "text-green-500" },
  { value: "intermediate", label: "Intermediate", icon: TreePine, color: "text-yellow-500" },
  { value: "advanced", label: "Advanced", icon: Mountain, color: "text-blue-500" },
  { value: "native", label: "Native", icon: Crown, color: "text-purple-500" },
];

export default function FamilyMembers({ 
  familyMembers, 
  onFamilyMembersChange, 
  onNext, 
  onBack 
}: FamilyMembersProps) {
  const [newMember, setNewMember] = useState<NewFamilyMember>({
    name: "",
    relationship: "",
    proficiency: "",
  });

  const addFamilyMember = () => {
    if (newMember.name && newMember.relationship && newMember.proficiency) {
      const updatedMembers = [...familyMembers, { ...newMember }];
      onFamilyMembersChange(updatedMembers);
      setNewMember({ name: "", relationship: "", proficiency: "" });
    }
  };

  const removeFamilyMember = (index: number) => {
    const updatedMembers = familyMembers.filter((_, i) => i !== index);
    onFamilyMembersChange(updatedMembers);
  };

  const updateNewMember = (field: keyof NewFamilyMember, value: string) => {
    setNewMember(prev => ({ ...prev, [field]: value }));
  };

  const isNewMemberValid = newMember.name && newMember.relationship && newMember.proficiency;

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-neutral mb-3">Add Family Members</h2>
        <p className="text-gray-600">Tell us about your family members and their language proficiency to personalize your learning experience.</p>
      </div>

      {/* Existing Family Members */}
      {familyMembers.length > 0 && (
        <div className="space-y-4 mb-6">
          {familyMembers.map((member, index) => (
            <Card key={index} className="bg-gray-50 border border-gray-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-neutral">Family Member {index + 1}</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFamilyMember(index)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <X size={16} />
                  </Button>
                </div>
                
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">Name</p>
                    <p className="text-neutral">{member.name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">Relationship</p>
                    <p className="text-neutral capitalize">{member.relationship}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">Proficiency</p>
                    <div className="flex items-center space-x-2">
                      {(() => {
                        const profLevel = PROFICIENCY_LEVELS.find(p => p.value === member.proficiency);
                        const Icon = profLevel?.icon || Sprout;
                        return (
                          <>
                            <Icon className={`${profLevel?.color || 'text-gray-500'}`} size={16} />
                            <span className="text-neutral capitalize">{member.proficiency}</span>
                          </>
                        );
                      })()}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Add New Family Member */}
      <Card className="bg-gray-50 border-2 border-dashed border-gray-300 mb-8">
        <CardContent className="p-6">
          <h3 className="font-semibold text-neutral mb-4">Add Family Member</h3>
          
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
              <Input
                type="text"
                placeholder="e.g., Grandma Marie"
                value={newMember.name}
                onChange={(e) => updateNewMember('name', e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Relationship</label>
              <Select value={newMember.relationship} onValueChange={(value) => updateNewMember('relationship', value)}>
                <SelectTrigger className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                  <SelectValue placeholder="Select relationship" />
                </SelectTrigger>
                <SelectContent>
                  {RELATIONSHIPS.map((rel) => (
                    <SelectItem key={rel.value} value={rel.value}>
                      {rel.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Language Proficiency</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {PROFICIENCY_LEVELS.map((level) => {
                const Icon = level.icon;
                const isSelected = newMember.proficiency === level.value;
                return (
                  <button
                    key={level.value}
                    type="button"
                    onClick={() => updateNewMember('proficiency', level.value)}
                    className={`flex flex-col items-center p-3 border rounded-lg transition-colors cursor-pointer ${
                      isSelected
                        ? 'border-primary bg-blue-50'
                        : 'border-gray-200 hover:border-primary hover:bg-blue-50'
                    }`}
                  >
                    <Icon className={`${level.color} mb-1`} size={20} />
                    <span className="text-xs font-medium text-center">{level.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <Button
            onClick={addFamilyMember}
            disabled={!isNewMemberValid}
            className="w-full bg-primary text-white py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            <Plus className="mr-2" size={16} />
            Add Family Member
          </Button>
        </CardContent>
      </Card>

      <div className="flex space-x-4">
        <Button
          onClick={onBack}
          variant="outline"
          className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-200 transition-colors"
        >
          <ArrowLeft className="mr-2" size={16} />
          Back
        </Button>
        <Button
          onClick={onNext}
          className="flex-1 bg-gradient-to-r from-primary to-accent text-white py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-300"
        >
          Continue
          <ArrowRight className="ml-2" size={16} />
        </Button>
      </div>
    </div>
  );
}
